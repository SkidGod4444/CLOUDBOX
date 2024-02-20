import { configDotenv } from "dotenv";
configDotenv();
let currentTokenIndex = 0; // Moved outside the function scope

export async function POST(req: Request) {
    const BOT_TOKENS: string[] = [
        process.env.TELEGRAM_BOT_TOKEN!,
        process.env.TELEGRAM_BOT2_TOKEN!,
    ];

    try {
        // Parse the request body as form data
        const formData = await req.formData();

        // Check if the form data contains a file
        if (!formData.has("file")) {
            throw new Error("No file uploaded");
        }

        // Get the file data from the form data
        const file = formData.get("file") as File;

        // Get the current bot token index
        const tokenIndex = currentTokenIndex;

        // Get the current bot token
        const currentBotToken = BOT_TOKENS[tokenIndex];

        // Determine which BOT token is being used
        let botType = "";
        if (currentBotToken === process.env.TELEGRAM_BOT_TOKEN) {
            botType = "BOT1";
        } else if (currentBotToken === process.env.TELEGRAM_BOT2_TOKEN) {
            botType = "BOT2";
        } else {
            botType = "UNKNOWN";
        }

        const TELEGRAM_API: string = process.env.TELEGRAM_API!;
        const CHAT_ID: string = process.env.TELEGRAM_CHAT_ID!;
        const UPLOAD_ROUTE: string = "/sendDocument";
        const curl: string = `${TELEGRAM_API}${currentBotToken}${UPLOAD_ROUTE}`;

        // Create a new FormData object and append the file
        const telegramFormData = new FormData();
        telegramFormData.append("chat_id", CHAT_ID);
        telegramFormData.append("document", file);

        // Send the file to the Telegram API
        const response = await fetch(curl, {
            method: "POST",
            body: telegramFormData,
        });

        // Parse the response from the Telegram API
        const data = await response.json();

        // Extract the required fields from the response
        const { message_id, document } = data.result;
        const { file_id, file_size } = document;

        // Switch to the next bot token for the next request
        currentTokenIndex = (currentTokenIndex + 1) % BOT_TOKENS.length;

        // Return the response along with the bot token type
        return new Response(JSON.stringify({ message_id, file_id, file_size, botType }), {
            headers: {
                "content-type": "application/json",
            },
        });
    } catch (error: any) {
        // Handle errors
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}
