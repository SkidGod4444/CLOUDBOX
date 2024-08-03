"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { CheckCheck } from "lucide-react";
import { useUser } from "@/context/user.context";
import { CheckUser, CreateUser } from "@/db/functions";
import { useToast } from "@/components/ui/use-toast";

export function AuthFormCard() {
  const user = useUser();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  const handleSendOtp = async () => {
    const res = await user.signup(email);
    if (res) {
      setIsOtpSent(true);
      toast({
        description: "OTP sent successfully! (check your mail box)",
      });
    }
  };

  const handleContinue = async () => {
    const isUserExist = await CheckUser(email);
    if (!isUserExist) {
      await CreateUser(email);
      toast({
        description: "Signed Up successfully!",
      });
    }
    await user.signin(otp);
    toast({
      description: "Signed In successfully!",
    });
    window.location.href = "/";
  };

  const handleReset = () => {
    // setName("");
    setEmail("");
    setOtp("");
    setIsOtpSent(false);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <div className="mb-3">
            <Image
              src="/cloudboxlogo.png"
              alt="logo"
              width={50}
              height={50}
              className="dark:hidden"
            />
            <Image
              src="/cloudboxpinklogo.png"
              alt="logo"
              width={50}
              height={50}
              className="hidden dark:block"
            />
          </div>
          Authenticate
        </CardTitle>
        <CardDescription>Continue with email OTP sign in.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid w-full items-center gap-4">
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={isOtpSent}
              />
            </div>
            {!isOtpSent ? (
              <Button size="sm" onClick={handleSendOtp}>
                Send OTP
              </Button>
            ) : (
              <Button size="sm" variant="outline" disabled>
                <CheckCheck className="h-5 w-5 mr-2" /> Sent OTP
              </Button>
            )}

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="otp">OTP</Label>
              <span className="text-sm text-muted-foreground">
                Enter the 6 digit OTP sent to your email.
              </span>
              <div className="flex justify-center items-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={handleOTPChange}
                  disabled={!isOtpSent}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} aria-placeholder="0" />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleContinue}>Continue</Button>
      </CardFooter>
    </Card>
  );
}
