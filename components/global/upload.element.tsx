"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UploadCloud } from "lucide-react";
import { upload } from '@vercel/blob/client';
import { type PutBlobResult } from '@vercel/blob';
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { AlertTriangle } from 'lucide-react'

interface AlertMsgProps {
    msg: string;
  }
export default function UploadElement() {
    const [file, setFile] = useState<File | null>();
    const [btnStatus, setBtnStatus] = useState<boolean>(true);
    const [alertMsg, setAlertMsg] = useState<string>("");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const AlertMsg: React.FC<AlertMsgProps> = ({ msg }) => {
        return (
            <Alert variant="destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Alert</AlertTitle>
            <AlertDescription>
              {msg}
            </AlertDescription>
          </Alert>
        );
      };
      const handleUpload = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
      
        if (!inputFileRef.current?.files) {
          throw new Error("No file selected");
        }
      
        const file = inputFileRef.current.files[0];
      
        const response = await fetch(
          `/api/avatar/upload?filename=${file.name}`,
          {
            method: 'POST',
            body: file,
          },
        );
      
        const newBlob = (await response.json()) as PutBlobResult;
      
        setBlob(newBlob);
      };
      

      const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            console.log("DEBUGGING: Selected file type:", selectedFile.type); // Debugging
            const allowedTypes = [
                "image/jpeg",
                "text/plain",
                "application/zip",
                "application/json",
                "image/png",
                "video/mp4",
                "audio/mpeg",        // MP3 audio
                "audio/wav",         // WAV audio
                "application/x-tar", // TAR archive
                "application/x-gzip",// GZIP archive
                "application/x-rar-compressed", // RAR archive
                "application/x-7z-compressed",  // 7Z archive
                "video/quicktime",   // MOV video
                "video/x-msvideo",   // AVI video
                "video/x-flv",       // FLV video
                "video/webm"         // WEBM video
              ];              
            const maxFileSize = 500 * 1024 * 1024; // 500MB in bytes
            console.log("DEBUGGING: File size:", selectedFile.size); // Debugging
            console.log("DEBUGGING: Allowed types:", allowedTypes); // Debugging
            if (
                allowedTypes.includes(selectedFile.type) &&
                selectedFile.size <= maxFileSize
            ) {
                setFile(selectedFile);
                setBtnStatus(false);
            } else {
                let errorMessage = "Please select a valid file (JPG, PNG, TXT, JSON, ZIP, GZIP, TAR, RAR, 7Z, MOV, WEBM, FLV, AVI, WAV or MP4, MP3) ";
                if (selectedFile.size > maxFileSize) {
                    errorMessage += "and ensure it is less than 500MB in size.";
                }
                setAlertMsg(errorMessage);
                setBtnStatus(true);
            }
        }
    };

  return (
    <div className="flex flex-col space-y-4 items-center justify-center w-full">
      <Label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-muted/60 hover:bg-muted/30"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-primary"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 ">
            <span className="font-bold text-primary">Click to upload</span>
          </p>
          <p className="text-xs text-gray-500">
          (MAX. 500MB)
          </p>
        </div>
        <Input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" required/>
      </Label>
    {alertMsg && 
    <AlertMsg msg={alertMsg} />}
     {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    <Button disabled={btnStatus} onClick={handleUpload}>
        <UploadCloud className="h-5 w-5 mr-2" /> Upload
    </Button>
    </div>
  );
}
