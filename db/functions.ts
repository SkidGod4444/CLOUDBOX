import { ID, Query } from "appwrite";
import { AppwriteDB } from "./config";
import { configDotenv } from "dotenv";
configDotenv();

async function CreateUser(id: string) {
  const promise = AppwriteDB.createDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d4e2edca42721b5705",
    id,
    { id: id }
  );
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function CheckUser(id: string) {
  const promise = AppwriteDB.listDocuments(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d4e2edca42721b5705",
    [Query.equal("id", id)]
  );
  if (promise !== undefined) {
    return promise;
  }
}

async function CreateUpload(msgId: string, fileId: string, fileSize: string, botType: string) {
  const promise = AppwriteDB.createDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d4e325a9a679460393",
    fileId,
    { msgId: msgId, fileId: fileId, fileSize: fileSize, name: msgId, botType: botType }
  );
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function DeleteUpload(fileId: string) {
  const promise = AppwriteDB.deleteDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d4e325a9a679460393",
    fileId
  );
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function RenameUpload(name: string) {
  const promise = AppwriteDB.updateDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d4e325a9a679460393",
    name,
    { name: name }
  );
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function CreateShare(fromId: string, fileId: string) {
  const promise = AppwriteDB.createDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d5956284a962716105",
    fileId,
    { id: fileId, fromId: fromId }
  );
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function DeleteShare(fileId: string) {
  const promise = AppwriteDB.deleteDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d5956284a962716105",
    fileId
  );
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function CreateFolder(name: string) {
  const promise = AppwriteDB.createDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d5931a96fa4225ab10",
    ID.unique(),
    { id: ID.unique(), name: name }
  );
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function RenameFolder(id: string, name: string) {
  const promise = AppwriteDB.updateDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d5931a96fa4225ab10",
    id,
    { name: name }
  );
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function DeleteFolder(Id: string) {
  const promise = AppwriteDB.deleteDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d5931a96fa4225ab10",
    Id
  );
  promise.then(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
    }
  );
}

async function PushUser(id: string) {
  const UserCheck = await CheckUser(id);
  if (UserCheck === undefined) {
    const created = await CreateUser(id);
    if (created !== undefined) {
      console.log("User Created");
    }
  }
  console.log("User Exists");
}

export {
  PushUser,
  CreateUser,
  CheckUser,
  CreateUpload,
  DeleteUpload,
  RenameUpload,
  CreateShare,
  DeleteShare,
  CreateFolder,
  RenameFolder,
  DeleteFolder,
};
