import Advertize from "@/component/Advertize/Advertize";
import Montiz from "@/component/Montiz/page";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Turn Your Anime Content Into Cash – Promote Animoon & Earn",
    description: "Join the Animoon Affiliate Program designed for anime content creators. Share Animoon with your audience and earn money for every click, signup, or sale. It’s fast, free, and perfect for anime fans looking to monetize their influence.",
  };
}

export default async function page({ searchParams }) {
  const searc = await searchParams;
  return (
    <div>
      <Montiz refer={searc.refer} />
      {/* <Advertize direct={searc.refer} /> */}
    </div>
  );
}
