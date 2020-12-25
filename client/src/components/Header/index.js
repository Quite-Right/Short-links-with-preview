import React from "react";
// import logo from "./";

export default function Header() {
  return (
    <div className="header">
      <a className="brand-container" href="/">
        <img alt="logo.png" src="/logo.png" className="brand-logo" />
        <div className="brand-name">MR Short Links</div>
      </a>
    </div>
  );
}
