import { ID, Query } from "appwrite";
import { AppwriteDB, AppwriteUser } from "./config";

async function CreateUser(email: string) {
  const promise = AppwriteDB.createDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d4e2edca42721b5705",
    ID.unique(),
    {email: email }
  );
  promise.then(
    function (response) {
      console.log(response);
      return true;
    },
    function (error) {
      console.log(error);
      return false;
    }
  );
}

async function CheckUser(email: string) {
  const promise = AppwriteDB.listDocuments(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d4e2edca42721b5705",
    [Query.equal("email", email)]
  );
  if (promise !== undefined) {
    console.log(promise)
    return true;
  } else {
    console.log(promise)
    return false;
  }
}

async function CreateUpload(
  msgId: string,
  fileId: string,
  fileSize: string,
  botType: string,
  userId: string
) {
  const promise = AppwriteDB.updateDocument(
    process.env.APPWRITE_DATABASE_ID! || "65d4e2cb945b18ce913c",
    "65d4e2edca42721b5705",
    userId,
    {
      uPLOADS: [
        {
          $id: msgId + msgId + fileSize,
          msgId: msgId,
          fileId: fileId,
          fileSize: fileSize,
          name: fileSize,
          botType: botType,
        },
      ],
    }
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

// async function PushUser(id: string) {
//   const UserCheck = await CheckUser(id);
//   if (UserCheck === undefined) {
//     const created = await CreateUser(id);
//     if (created !== undefined) {
//       console.log("User Created");
//     }
//   }
//   console.log("User Exists");
// }

//////////////////////// LOGIN USING EMAIL OTP ///////////////////////////////////////////

async function SignUp(email: string) {
  try {
    const sessionToken = await AppwriteUser.createEmailToken(
      ID.unique(),
      email
    );
    const userId = sessionToken.userId;
    return userId;
  } catch (error: any) {
    console.log(error);
  }
}

async function SignIn(userId: string, code: string) {
  try {
    const session = await AppwriteUser.createSession(userId, code);
    return session;
  } catch (error: any) {
    console.log(error);
  }
}

async function SignName(name: string) {
  try {
    await AppwriteUser.updateName(name);
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

async function SignKey(key: string) {
  try {
    const prefs = await AppwriteUser.getPrefs();
    prefs["cloud-key"] = key;
    await AppwriteUser.updatePrefs(prefs);
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

async function SignIsNsfw(val: "true" | "false") {
  try {
    const prefs = await AppwriteUser.getPrefs();
    prefs["is-nsfw"] = val;
    await AppwriteUser.updatePrefs(prefs);
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

async function GetKey() {
  try {
    const res = await AppwriteUser.getPrefs();
    return res?.['cloud-key'];
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

async function GetIsNsfw() {
  try {
    const res = await AppwriteUser.getPrefs();
    return res?.['is-nsfw'];
  } catch (error: any) {
    console.log(error);
    return false;
  }
}

export {
  SignIn,
  SignUp,
  SignName,
  SignKey,
  SignIsNsfw,
  GetKey,
  GetIsNsfw,
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
