"use client";
import { usePathname } from "next/navigation";
import BottomLeftAd from "../BottomLeftAd/BottomLeftAd";

export default function AdWrapper() {
  const pathname = usePathname();
  const hiddenPaths = ["/ad", "/ad2"];
  const shouldHide = hiddenPaths.includes(pathname);

  return !shouldHide ? <BottomLeftAd /> : null;
}
