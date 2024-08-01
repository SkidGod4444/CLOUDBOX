
import { Account, Client, Databases } from "appwrite";
// Init your Web SDK
const AppwriteClient = new Client();
const EndPoint: string = process.env.APPWRITE_ID || "https://cloud.appwrite.io/v1"
const ProjectId: string = process.env.APPWRITE_PROJECT_ID || "65d4e0ff236bc8377158";

AppwriteClient
    .setEndpoint(EndPoint) // Your Appwrite Endpoint
    .setProject(ProjectId) // Your project ID
;
const AppwriteDB = new Databases(AppwriteClient);
const AppwriteUser = new Account(AppwriteClient);

export { AppwriteDB, AppwriteClient, AppwriteUser };