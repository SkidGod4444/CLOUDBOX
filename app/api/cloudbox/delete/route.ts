import { configDotenv } from "dotenv";
configDotenv();
let currentTokenIndex = 0; // Moved outside the function scope

export async function POST(req: Request) {
    const BOT_TOKENS: string[] = [
        process.env.TELEGRAM_BOT_TOKEN!,
        process.env.TELEGRAM_BOT2_TOKEN!,
    ];

    try {
        // Parse the request body as JSON
        const body = await req.json();
        const message_id = body.msgId;

        // Check if the message_id and chat_id are provided
        if (!message_id) {
            throw new Error("Message ID is missing");
        }

        // Get the current bot token index
        const tokenIndex = currentTokenIndex;

        // Get the current bot token
        const currentBotToken = BOT_TOKENS[tokenIndex];
        const TELEGRAM_API: string = process.env.TELEGRAM_API!;
        const DELETE_ROUTE: string = "/deleteMessage";
        const CHAT_ID: string = process.env.TELEGRAM_CHAT_ID!;
        const curl: string = `${TELEGRAM_API}${currentBotToken}${DELETE_ROUTE}`;

        // Construct the request body as a JavaScript object
        const data = { chat_id: CHAT_ID, message_id: message_id };

        // Send the request to the Telegram API
        const response = await fetch(curl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Parse the response from the Telegram API
        const res = await response.json();

        // Switch to the next bot token for the next request
        currentTokenIndex = (currentTokenIndex + 1) % BOT_TOKENS.length;

        // Return the response along with the bot token type
        return new Response(JSON.stringify(res.ok), {
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
