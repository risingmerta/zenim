import Advertize from "@/component/Advertize/Advertize";
import Category from "@/component/category/Category";
import React from "react";

export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
  const id = param.id;
  const page = searchParam.page || 1;
  return (
    <div>
      <Category
        path={"genre/" + id}
        label={id.split("-")?.join(" ")}
        pagel={page}
      />
      <Advertize />
    </div>
  );
}
