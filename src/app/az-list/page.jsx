import AtoZ from "@/component/a2z/AtoZ";
import React from "react";

export default async function page({ searchParams }) {
  const search = await searchParams;
  const page = search.page || 1;
  return (
    <div>
      <AtoZ path={`az-list`} page={page} />
    </div>
  );
}
