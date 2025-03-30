import { db } from "../../../database/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    // Get current date to filter out notices that haven't been published yet
    const currentDate = new Date();
    
    // Create a query to get all notices and order by publishDate (descending)
    const noticesQuery = query(
      collection(db, "notices"),
      orderBy("publishDate", "desc")
    );
    
    const noticesSnapshot = await getDocs(noticesQuery);
    
    if (noticesSnapshot.empty) {
      return new Response(JSON.stringify([]), { status: 200 });
    }
    
    // Process the notices
    const notices = noticesSnapshot.docs.map(doc => {
      const data = doc.data();
      
      // Convert Firestore Timestamps to ISO strings for JSON serialization
      const processedData = {
        ...data,
        id: doc.id,
        publishDate: data.publishDate?.toDate().toISOString() || null,
        expiryDate: data.expiryDate?.toDate().toISOString() || null,
        createdAt: data.createdAt?.toDate().toISOString() || null
      };
      
      return processedData;
    });
    
    // Filter out notices that aren't published yet
    const publishedNotices = notices.filter(notice => {
      if (!notice.publishDate) return true;
      const publishDate = new Date(notice.publishDate);
      return publishDate <= currentDate;
    });
    
    return new Response(JSON.stringify(publishedNotices), { status: 200 });
  } catch (error) {
    console.error("Error fetching notices: ", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch notices" }), 
      { status: 500 }
    );
  }
}