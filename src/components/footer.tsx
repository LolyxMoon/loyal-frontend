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
      <svg
        fill= "currentColor"
        height="20"
        viewBox="0 0 24 24"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
    >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
{
  name: "Email",
    url: "mailto:main@askloyal.com",
      icon: (
        <svg
        fill= "currentColor"
  height = "20"
  viewBox = "0 0 24 24"
  width = "20"
  xmlns = "http://www.w3.org/2000/svg"
    >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
},
{
  name: "GitHub",
    url: "https://github.com/loyal-labs",
      icon: (
        <svg
        fill= "currentColor"
  height = "20"
  viewBox = "0 0 24 24"
  width = "20"
  xmlns = "http://www.w3.org/2000/svg"
    >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
},
];

const legalLinks = [
  {
    name: "Trade $LOYAL on PumpFun",
    url: "https://pump.fun/coin/",
  },
  { name: "Join Discord community", url: "" },
  { name: "Join Telegram community", url: "" },
];

export function Footer() {
  return (
    <footer
      id= "footer-section"
  style = {{
    background: "rgba(0, 0, 0, 0.95)",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        position: "relative",
          overflow: "hidden",
      }
}
    >
  <div
        className="footer-content"
style = {{
  maxWidth: "1200px",
    margin: "0 auto",
      padding: "4rem 2rem 2rem",
        }}
      >
  {/* Social Links */ }
  < div
className = { ibmPlexSans.className }
style = {{
  display: "flex",
    justifyContent: "center",
      alignItems: "center",
        gap: "2rem",
          marginBottom: "3rem",
          }}
        >
{
  socialLinks.map((link) => (
    <motion.a
              aria - label= { link.name }
              href = { link.url }
              key = { link.name }
              onMouseEnter = {(e) => {
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
    e.currentTarget.style.color = "rgba(255, 255, 255, 0.95)";
  }}
onMouseLeave = {(e) => {
  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
  e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
}}
rel = "noopener noreferrer"
style = {{
  display: "flex",
    alignItems: "center",
      justifyContent: "center",
        width: "3rem",
          height: "3rem",
            flexShrink: 0,
              borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "rgba(255, 255, 255, 0.7)",
                        transition: "all 0.3s ease",
                          textDecoration: "none",
              }}
target = "_blank"
whileHover = {{ scale: 1.1 }}
whileTap = {{ scale: 0.95 }}
            >
  { link.icon }
  </motion.a>
          ))}
</div>

{/* Regular Links */ }
<div
          className={ ibmPlexSans.className }
style = {{
  display: "flex",
    justifyContent: "center",
      alignItems: "center",
        gap: "2rem",
          flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
{
  legalLinks.map((link, index) => (
    <motion.a
              href= { link.url }
              key = { link.name }
              onMouseEnter = {(e) => {
    e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
  }}
onMouseLeave = {(e) => {
  e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
}}
rel = "noopener noreferrer"
style = {{
  fontSize: "0.875rem",
    fontWeight: 400,
      color: "rgba(255, 255, 255, 0.5)",
        textDecoration: "none",
          transition: "all 0.3s ease",
            position: "relative",
              }}
target = "_blank"
whileHover = {{ y: -2 }}
            >
  { link.name }
{
  index < legalLinks.length - 1 && (
    <span
                  style={
    {
      position: "absolute",
        right: "-1rem",
          top: "50%",
            transform: "translateY(-50%)",
              color: "rgba(255, 255, 255, 0.2)",
                  }
  }
                >
                  •
  </span>
              )
}
</motion.a>
          ))}
</div>

{/* Stay Loyal */ }
<div
          style={
  {
    position: "relative",
      paddingBottom: "2rem",
          }
}
        >
  <h2
            className={ instrumentSerif.className }
style = {{
  fontSize: "clamp(4rem, 12vw, 10rem)",
    fontWeight: 400,
      textAlign: "center",
        background:
  "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 100%)",
    WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
        backgroundClip: "text",
          lineHeight: 1,
            margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
  Stay Loyal
    </h2>
    </div>

{/* Copyright and Status */ }
<div
          className={ ibmPlexSans.className }
id = "footer-copyright"
style = {{
  display: "flex",
    justifyContent: "space-between",
      alignItems: "center",
        fontSize: "0.75rem",
          color: "rgba(255, 255, 255, 0.3)",
            paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                flexWrap: "wrap",
                  gap: "1rem",
          }}
        >
  <div>© { new Date().getFullYear() } Loyal.All rights reserved.</div>
    < iframe
frameBorder = "0"
height = "30"
scrolling = "no"
src = "https://status.askloyal.com/badge?theme=dark"
style = {{
  colorScheme: "normal",
    border: "none",
            }}
title = "Status Badge"
width = "250"
  />
  </div>
  </div>
  < style jsx > {`
        @media (max-width: 767px) {
          .footer-content {
            padding-bottom: 12rem !important;
          }
        }
      `}</style>
  </footer>
  );
}
