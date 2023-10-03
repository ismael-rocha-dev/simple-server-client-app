"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import RealTimeChart from "./components/RealTimeChart";

export default function Home() {
  useEffect(() => {
    const domContainer = document.querySelector("#chart");
    //ReactDOM.render(React.createElement(RealTimeChart), domContainer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-200">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <div id="chart" className="w-[800px]">
          <RealTimeChart />
        </div>
      </div>
    </main>
  );
}
