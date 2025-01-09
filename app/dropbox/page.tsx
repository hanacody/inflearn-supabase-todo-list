import { Metadata } from "next";
import UI from "./ui";

export const metadata: Metadata = {
  title: "DropBox",
  description: "DropBox",
};

export default function Page() {
  return <UI />;
}

