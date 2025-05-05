import Watch from "@/component/watch/Watch";
import React from "react";
export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
  const { id } = param;
  const { ep } = searchParam;
  return (
    <div>
      <Watch id={id} epId={ep} />
    </div>
  );
}
