import connectToDatabase from "./config/database.js";
import Credential from "./models/Credential.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Missing username or password" });
        }

        await connectToDatabase();
        const user = await Credential.findOne({ username, password }).select("flashcardSets");

        if (!user || user.flashcardSets.length === 0) {
            return res.status(404).json({ error: "No matching data found or no flashcards available" });
        }

        res.status(200).json({
            message: "Successfully found matching data",
            matchingData: user.flashcardSets,  // Returning flashcardSets directly
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}
