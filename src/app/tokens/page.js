"use client";

import { useState } from "react";
import DisplaySwitch from "@/components/switch/DisplaySwitch";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import Tokens from "./Tokens";

const TokensPage = () => {
  const [daysAgo, setDaysAgo] = useState(1);

  return (
    <>
      <section className="flex items-center justify-between mb-10">
        <Breadcrumbs />
        <DisplaySwitch onChange={setDaysAgo} activeOption={daysAgo} />
      </section>

      <div className="flex flex-row justify-between items-center mb-5">
        <h1 className="text-xl md:text-1xl xl:text-2xl">Tokens</h1>
      </div>

      <Tokens daysAgo={daysAgo} />
    </>
  );
};

export default TokensPage;
