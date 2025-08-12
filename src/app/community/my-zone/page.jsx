"use client";
import React from "react";
import Zone from "./myzone";
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <div>
      <SessionProvider>
        <Zone />
      </SessionProvider>
    </div>
  );
};

export default page;
