"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const brandNavy = "#0B2545";
const brandRed = "#E63946";
const white = "#ffffff";

const navLinks = [
  { href: "/activate", label: "Activate" },
  { href: "/join", label: "Telegram Tips" },
  { href: "/sportsbooks", label: "Sportsbooks" },
  { href: "/sweepstakes", label: "Sweepstakes" },
  { href: "/casino", label: "Casino" },
  { href: "/join", label: "Activate Now", isButton: true },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div style={{ position: "relative" }}>
      {/* Hamburger button */}
      <button
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 38,
          height: 38,
          background: "none",
          border: "none",
          cursor: "pointer",
          marginLeft: 8,
        }}
      >
        <span style={{
          width: 26,
          height: 3,
          background: white,
          borderRadius: 2,
          marginBottom: 5,
          display: "block",
        }} />
        <span style={{
          width: 26,
          height: 3,
          background: white,
          borderRadius: 2,
          marginBottom: 5,
          display: "block",
        }} />
        <span style={{
          width: 26,
          height: 3,
          background: white,
          borderRadius: 2,
          display: "block",
        }} />
      </button>
      {/* Dropdown menu */}
      {open && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: 48,
            right: 0,
            background: brandNavy,
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            minWidth: 180,
            zIndex: 100,
            padding: "18px 0 10px 0",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={
                link.isButton
                  ? {
                      background: white,
                      color: brandNavy,
                      padding: "12px 20px",
                      borderRadius: 9999,
                      fontWeight: 700,
                      textDecoration: "none",
                      margin: "8px 16px 0 16px",
                      textAlign: "center",
                      display: "block",
                    }
                  : {
                      color: white,
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: 16,
                      padding: "12px 20px",
                      borderRadius: 10,
                      margin: "0 16px",
                      display: "block",
                    }
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
      {/* Responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-nav-hamburger { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
