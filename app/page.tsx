import UI from "./ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo",
  description: "Todo",
};

export default function Home() {
  return (
    <main>
      <UI />
    </main>
  );
}
