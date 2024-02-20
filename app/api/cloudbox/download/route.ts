// .
// .
// .
// HELP ME IN MAKING DOWNLOAD ENDPOINT ITS BROKEN PLS DONT TRY THIS END POINT
// WAIT FOR ME MAY BE ONE DAY I WILL WORK ON IT HAHAH LOL .
// .
// .
// .

import { configDotenv } from "dotenv";
configDotenv();
let currentTokenIndex = 0; // Moved outside the function scope

export async function POST(req: Request) {
    const BOT_TOKENS: string[] = [
        process.env.TELEGRAM_BOT_TOKEN!,
        process.env.TELEGRAM_BOT2_TOKEN!,
    ];

    try {
        const fileId = await req.json();

        if (!fileId) {
            throw new Error("No fileId provided");
        }

        const ROUTE_TOKENS = BOT_TOKENS[currentTokenIndex];
        const TELEGRAM_API: string = process.env.TELEGRAM_API!;
        const DOWNLOAD_ROUTE: string = "getFile";
        const curl: string = `${TELEGRAM_API}${ROUTE_TOKENS}${DOWNLOAD_ROUTE}`;
        const data = { file_id: fileId };

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
            throw new Error("Failed to fetch file information");
        }

        const fileJson = await response.json();

        if (!fileJson || !fileJson.result || !fileJson.result.file_path) {
            throw new Error("File path not found in response");
        }

        const FILE_PATH = fileJson.result.file_path;
        const TELEGRAM_FILE_API: string = process.env.TELEGRAM_FILE_API!;
        const DOWNLOAD_URL = `${TELEGRAM_FILE_API}${ROUTE_TOKENS}/${FILE_PATH}`;
        const fileResponse = await fetch(DOWNLOAD_URL);

        if (!fileResponse.ok) {
            return new Response("Failed to fetch image", { status: 500 });
        }

        console.log("file size is dw ", fileResponse.headers.get("content-length"));

        return new Response(fileResponse.body, {
            headers: {
                "Content-Type": "application/octet-stream",
                "Content-Disposition": `attachment; filename=${FILE_PATH}`,
            },
        });
    } catch (error: any) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}
// .
// .
// .
// HELP ME IN MAKING DOWNLOAD ENDPOINT ITS BROKEN PLS DONT TRY THIS END POINT
// WAIT FOR ME MAY BE ONE DAY I WILL WORK ON IT HAHAH LOL .
// .
// .
// .