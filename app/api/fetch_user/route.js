 // Adjust the path based on your project structure

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        // Extract the token from the request headers
        const token = req.headers.authorization?.split("Bearer ")[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verify the Firebase Auth token
        const decodedToken = await admin.auth().verifyIdToken(token);
        return res.status(200).json({ user: decodedToken });
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}
