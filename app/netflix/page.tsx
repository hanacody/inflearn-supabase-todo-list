import { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "Netflix",
  description: "Netflix",
};

export default function Page() {
  return <UI />;
}

