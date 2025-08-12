import React from "react";
 // make sure this CSS file is in the same folder or adjust import path
import SharedList from "@/component/WatchList/SharedList";
import { IoArrowBack, IoHome } from "react-icons/io5";
import Link from "next/link";

export default async function Page({ params, searchParams }) {
  const param = await params; // params is already an object, no need to await
  const searchParam = await searchParams;
  const id = param.id;
  const refer = searchParam.refer;
  const type = searchParam.type;
  const page = searchParam.page;

  return (
    <div>
      <SharedList type={type} id={id} page={page} refer={refer} />
    </div>
  );
}
