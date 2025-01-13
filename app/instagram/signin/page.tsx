import { Metadata } from "next";
import SignInUI from "./ui";

export const metadata: Metadata = {
  title: "Instagram 로그인",
  description: "Instagram 계정으로 로그인하세요",
};

export default function SignInPage() {
  return <SignInUI />;
} 