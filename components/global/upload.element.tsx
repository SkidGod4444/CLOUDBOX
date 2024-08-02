"use client";
import { useState, ChangeEvent } from "react";
import { Lock, UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import UploadPreview from "./upload.preview";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { toast, useToast } from "../ui/use-toast";
import { CreateUpload } from "@/db/functions";
import { useUser } from "@/context/user.context";

interface AlertMsgProps {
  msg: string;
}

export default function UploadElement() {
  const [file, setFile] = useState<File | null>(null);
  const [btnStatus, setBtnStatus] = useState<boolean>(true);
  const [alertMsg, setAlertMsg] = useState<string>("");
  const { toast } = useToast();
  const { current } = useUser();
  const handleUpload = async () => {
    try {
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `https://api-cloudbox.vercel.app/bot/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Handle the response from the server as needed
      const cloudKeyValue = () => {
        if (typeof window !== "undefined") {
          return localStorage.getItem("CloudKey") ?? "";
        }
      };
      const userId: string = cloudKeyValue() || "";
      const responseData = await response.json();
      const { message_id, file_id, file_size, botType } = responseData;
      // console.log(
      //   String(message_id),
      //   String(file_id),
      //   String(file_size),
      //   String(botType),
      //   String(userId)
      // );
      // console.log('Upload successful:', responseData);
      setFile(null);
      setBtnStatus(true);
      CreateUpload(
        String(message_id),
        String(file_id),
        String(file_size),
        String(botType),
        String(userId)
      );
      toast({
        title: "Notification",
        description: "Your file is now stored successfully!",
      });
      // console.log('DEBUGGING: File uploaded successfully:', responseData); // Debugging
    } catch (error) {
      console.error("Error uploading file:", error);
      setFile(null);
      setBtnStatus(true);
      setAlertMsg("Failed to upload file");
    }
  };

  // console.log(current?.prefs);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // console.log('DEBUGGING: Selected file type:', selectedFile.type); // Debugging
      const allowedTypes = [
        "image/jpeg",
        "text/plain",
        "application/zip",
        "application/json",
        "image/png",
        "video/mp4",
        "audio/mpeg", // MP3 audio
        "audio/wav", // WAV audio
        "application/x-tar", // TAR archive
        "application/pdf",
        "application/x-gzip", // GZIP archive
        "application/x-rar-compressed", // RAR archive
        "application/x-7z-compressed", // 7Z archive
        "video/quicktime", // MOV video
        "video/x-msvideo", // AVI video
        "video/x-flv", // FLV video
        "video/webm", // WEBM video
      ];
      const maxFileSize = 2000 * 1024 * 1024; // 2000MB in bytes
      // console.log('DEBUGGING: File size:', selectedFile.size); // Debugging
      // console.log('DEBUGGING: File name:', selectedFile.name); // Debugging
      if (
        allowedTypes.includes(selectedFile.type) &&
        selectedFile.size <= maxFileSize
      ) {
        setFile(selectedFile);
        setBtnStatus(false);
        setAlertMsg("");
      } else {
        let errorMessage =
          "Please select a valid file (PDF, JPG, PNG, TXT, JSON, ZIP, GZIP, TAR, RAR, 7Z, MOV, WEBM, FLV, AVI, WAV or MP4, MP3) ";
        if (selectedFile.size > maxFileSize) {
          errorMessage += "and ensure it is less than 2000MB in size.";
        }
        setAlertMsg(errorMessage);
        setBtnStatus(true);
      }
    }
  };

  const AlertMsg: React.FC<AlertMsgProps> = ({ msg }) => {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Alert</AlertTitle>
        <AlertDescription>{msg}</AlertDescription>
      </Alert>
    );
  };

  if (current) {
    return (
      <div className="flex flex-col space-y-4 items-center justify-center w-full">
        <Label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary hover:border-secondary border-dashed rounded-lg cursor-pointer bg-muted/60 hover:bg-muted/30"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="h-8 w-8 text-primary" />
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-bold text-primary">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500">(MAX: 2000MB)</p>
          </div>
          <Input
            onChange={handleFileChange}
            id="dropzone-file"
            type="file"
            className="hidden"
            required
          />
        </Label>
        {file && (
          <UploadPreview
            file={file}
            removeFile={() => {
              setFile(null);
              setBtnStatus(true);
            }}
          />
        )}
        {alertMsg && <AlertMsg msg={alertMsg} />}
        <Button disabled={btnStatus} onClick={handleUpload}>
          <UploadCloud className="h-5 w-5 mr-2" /> Upload
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col space-y-4 items-center justify-center w-full">
        <Label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary hover:border-secondary border-dashed rounded-lg cursor-pointer bg-muted/60 hover:bg-muted/30"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-2">
            <Lock className="h-8 w-8 text-primary" />
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-bold text-primary">
                Authentication Needed!
              </span>
            </p>
          </div>
        </Label>
        <Button disabled={btnStatus} onClick={handleUpload}>
          <UploadCloud className="h-5 w-5 mr-2" /> Upload
        </Button>
      </div>
    );
  }
}
