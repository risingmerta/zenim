import AtoZ from "@/component/a2z/AtoZ";
import Advertize from "@/component/Advertize/Advertize";
import React from "react";

export default async function page({ params, searchParams }) {
  const param = await params;
  const search = await searchParams;
  const id = param.id;
  const page = search.page || 1;
  return (
    <div>
      <AtoZ path={`az-list/${id}`} page={page} />
      <Advertize />
    </div>
  );
}
