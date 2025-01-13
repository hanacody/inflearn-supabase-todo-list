import { Metadata } from "next";
import SignUpUI from "./ui";

export const metadata: Metadata = {
  title: "Instagram signup",
  description: "Instagram signup",
};

export default function SignUpPage() {
  return <SignUpUI />;
}

