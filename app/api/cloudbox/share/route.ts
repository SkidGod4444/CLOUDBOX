import { configDotenv } from "dotenv";
configDotenv();
let tokenIndex = 0; // Initialize token index to BOT_TOKENS[0]

export async function POST(req: Request) {
    const BOT_TOKENS: string[] = [
        process.env.TELEGRAM_BOT_TOKEN!,
        process.env.TELEGRAM_BOT2_TOKEN!,
    ];
    try {
        const body = await req.json(); // Parse the request body once

        const msgId = body.msgId;
        const fromId = body.fromId;
        const toId = body.toId;
        const botType = body.botType; // Get the provided botType

        

        // Determine the token index based on the provided botType
        if (botType === "BOT1") {
            tokenIndex = 0;
        } else if (botType === "BOT2") {
            tokenIndex = 1;
        } else {
            throw new Error("Invalid botType provided");
        }

        // Get the corresponding bot token
        const ROUTE_TOKENS = BOT_TOKENS[tokenIndex];
        const TELEGRAM_API: string = process.env.TELEGRAM_API!;
        const FORWARD_ROUTE: string = "/forwardMessage";
        const curl: string = `${TELEGRAM_API}${ROUTE_TOKENS}${FORWARD_ROUTE}`;
        const data = { chat_id: toId, from_chat_id: fromId, message_id: msgId };

        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(curl, options);

        if (!response.ok) {
            console.log("DEBUGGING: Response not ok:", response); // Debugging
            throw new Error("Failed to forward message");
        }

        const fwdJson = await response.json();

        return new Response(JSON.stringify(fwdJson), {
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
