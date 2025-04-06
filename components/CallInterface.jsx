'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PhoneCall, PhoneOff, Video, VideoOff, Mic, MicOff, User } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { db } from "../database/firebase";
import { collection, doc, setDoc, getDoc, onSnapshot, updateDoc, query, where, getDocs } from "firebase/firestore";

export default function CallInterface() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [inCall, setInCall] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  
  // Configuration for WebRTC
  const servers = {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
  };

  // Fetch available users
  useEffect(() => {
    if (!user) return;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "!=", user.uid));
    
    getDocs(q).then((querySnapshot) => {
      const usersList = [];
      querySnapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersList);
    });
  }, [user]);

  // Initialize WebRTC when a call starts
  const setupWebRTC = async () => {
    try {
      // Get local media stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const peerConnection = new RTCPeerConnection(servers);
      peerConnectionRef.current = peerConnection;

      // Add local tracks to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      // Set up remote stream handlers
      peerConnection.ontrack = (event) => {
        const remoteMediaStream = new MediaStream();
        event.streams[0].getTracks().forEach(track => {
          remoteMediaStream.addTrack(track);
        });
        setRemoteStream(remoteMediaStream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteMediaStream;
        }
      };

      // Set up ICE candidate handling
      peerConnection.onicecandidate = (event) => {
        if (event.candidate && user && selectedUser) {
          // Make sure both user and selectedUser exist before accessing their uid properties
          const callDoc = doc(db, 'calls', `${user.uid}_${selectedUser.uid}`);
          const candidatesCollection = collection(callDoc, `${user.uid}Candidates`);
          setDoc(doc(candidatesCollection), event.candidate.toJSON());
        }
      };

      return peerConnection;
    } catch (error) {
      console.error("Error setting up WebRTC:", error);
      return null;
    }
  };

  // Start a call to selected user
  const startCall = async () => {
    if (!selectedUser) return;
    
    // Setup WebRTC
    const peerConnection = await setupWebRTC();
    if (!peerConnection) return;
    
    // Create unique call document in Firestore
    const callId = `${user.uid}_${selectedUser.uid}`;
    const callDoc = doc(db, 'calls', callId);
    const offerCandidates = collection(callDoc, `${user.uid}Candidates`);
    const answerCandidates = collection(callDoc, `${selectedUser.uid}Candidates`);

    // Listen for remote ICE candidates
    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnectionRef.current.addIceCandidate(candidate);
        }
      });
    });

    // Create offer
    const offerDescription = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offerDescription);

    // Store the offer in Firestore
    await setDoc(callDoc, {
      caller: user.uid,
      callee: selectedUser.uid,
      offer: { 
        type: offerDescription.type, 
        sdp: offerDescription.sdp 
      },
      status: 'pending'
    });

    // Listen for answer
    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        peerConnection.setRemoteDescription(answerDescription);
      }
      
      if (data?.status === 'accepted') {
        setInCall(true);
      } else if (data?.status === 'ended') {
        endCall();
      }
    });
    
    // Notify user of call
    await updateDoc(doc(db, 'users', selectedUser.uid), {
      incomingCall: {
        from: user.uid,
        callId: callId
      }
    });
  };

  // Accept incoming call
  const acceptCall = async (callId, callerId) => {
    // Setup WebRTC
    const peerConnection = await setupWebRTC();
    if (!peerConnection) return;
    
    const callDoc = doc(db, 'calls', callId);
    const callData = (await getDoc(callDoc)).data();
    
    const offerCandidates = collection(callDoc, `${callerId}Candidates`);
    const answerCandidates = collection(callDoc, `${user.uid}Candidates`);

    // Listen for remote ICE candidates
    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnectionRef.current.addIceCandidate(candidate);
        }
      });
    });

    // Set remote description from the offer
    const offerDescription = callData.offer;
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offerDescription));

    // Create answer
    const answerDescription = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answerDescription);

    // Store the answer in Firestore
    await updateDoc(callDoc, {
      answer: {
        type: answerDescription.type,
        sdp: answerDescription.sdp
      },
      status: 'accepted'
    });
    
    setInCall(true);
    
    // Clear incoming call notification
    await updateDoc(doc(db, 'users', user.uid), {
      incomingCall: null
    });
  };

  // End the call
  const endCall = async () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    
    setLocalStream(null);
    setRemoteStream(null);
    setInCall(false);
    
    // Update call status in Firestore if in a call
    if (selectedUser) {
      const callId = `${user.uid}_${selectedUser.uid}`;
      await updateDoc(doc(db, 'calls', callId), {
        status: 'ended'
      });
    }
  };

  // Toggle audio mute
  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  // Listen for incoming calls
  useEffect(() => {
    if (!user) return;
    
    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      const userData = doc.data();
      if (userData?.incomingCall) {
        const caller = users.find(u => u.uid === userData.incomingCall.from);
        if (caller) {
          setSelectedUser(caller);
          // Show incoming call UI and option to accept
          if (confirm(`Incoming call from ${caller.displayName}. Accept?`)) {
            acceptCall(userData.incomingCall.callId, userData.incomingCall.from);
          } else {
            // Reject call
            updateDoc(doc(db, 'calls', userData.incomingCall.callId), {
              status: 'rejected'
            });
            updateDoc(userRef, {
              incomingCall: null
            });
          }
        }
      }
    });
    
    return () => unsubscribe();
  }, [user, users]);

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h2 className="text-xl font-bold">Video Call</h2>
      
      {!inCall ? (
        <div className="space-y-2">
          <h3 className="font-medium">Select a user to call:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {users.map(user => (
              <div 
                key={user.uid} 
                className={`p-3 border rounded-md cursor-pointer flex items-center space-x-2 ${selectedUser?.uid === user.uid ? 'bg-blue-100 border-blue-500' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <User className="w-5 h-5" />
                <span>{user.displayName || user.email}</span>
              </div>
            ))}
          </div>
          
          <button
            disabled={!selectedUser}
            onClick={startCall}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {selectedUser?.displayName || selectedUser?.email}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative rounded-md overflow-hidden bg-gray-100 aspect-video">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                You {isMuted && '(Muted)'} {isVideoOff && '(Video Off)'}
              </div>
            </div>
            
            <div className="relative rounded-md overflow-hidden bg-gray-100 aspect-video">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {selectedUser?.displayName || selectedUser?.email}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            
            <button
              onClick={toggleVideo}
              className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
            
            <button
              onClick={endCall}
              className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}