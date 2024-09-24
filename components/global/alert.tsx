import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function AlertMsg(msg: any) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle>Alert</AlertTitle>
      <AlertDescription>{msg}</AlertDescription>
    </Alert>
  );
}
