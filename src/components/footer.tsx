"use client";

import { motion } from "motion/react";
import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";

const instrumentSerif = localFont({
  src: [
    {
      path: "../../public/fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const socialLinks = [
  {
    name: "X",
    url: "https://x.com/PrivacyLoyal",
    icon: (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:main@askloyal.com",
    icon: (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer
      id="footer-section"
      style={{
        background: "rgba(0, 0, 0, 0.95)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem 2rem" }}>
        {/* Social Links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "3rem" }}>
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>

        {/* Brand Name */}
        <div style={{ position: "relative", paddingBottom: "2rem" }}>
          <h2
            className={instrumentSerif.className}
            style={{
              fontSize: "clamp(4rem, 12vw, 10rem)",
              fontWeight: 400,
              textAlign: "center",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Loyal Privacy
          </h2>
        </div>

        {/* Copyright */}
        <div
          className={ibmPlexSans.className}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.75rem",
            color: "rgba(255, 255, 255, 0.3)",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <div>© {new Date().getFullYear()} Loyal Privacy. All rights reserved.</div>
          <iframe
            src="https://status.askloyal.com/badge?theme=dark"
            height="30"
            width="250"
            frameBorder="0"
            scrolling="no"
            title="Status Badge"
          />
        </div>
      </div>
    </footer>
  );
}
