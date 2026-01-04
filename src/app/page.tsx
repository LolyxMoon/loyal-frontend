"use client";

import { BentoGridSection } from "@/components/bento-grid-section";
import { Footer } from "@/components/footer";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { RoadmapSection } from "@/components/roadmap-section";
import { type SkillsInputRef } from "@/components/skills-input";
import { type CopyIconHandle } from "@/components/ui/copy";
import { MenuIcon, type MenuIconHandle } from "@/components/ui/menu";
import { type PlusIconHandle } from "@/components/ui/plus";
import { useChatMode } from "@/contexts/chat-mode-context";
import { isSkillsEnabled } from "@/flags";
import { useSend } from "@/hooks/use-send";
import { useSwap } from "@/hooks/use-swap";
import type { LoyalSkill } from "@/types/skills";
import { useChat } from "@ai-sdk/react";
import { useAccounts, useModal, usePhantom } from "@phantom/react-sdk";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowDownIcon } from "lucide-react";
import { IBM_Plex_Sans, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const instrumentSerif = localFont({
  src: [
    {
      path: "../../public/fonts/InstrumentSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/InstrumentSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const dirtyline = localFont({
  src: "../../public/fonts/Dirtyline 36daysoftype 2022.woff2",
  display: "swap",
});

type TimestampedMessage = UIMessage & { createdAt?: number };

export default function LandingPage() {
  const { messages, sendMessage, status, setMessages } =
    useChat<TimestampedMessage>({
      transport: new DefaultChatTransport({
        api: "/api/chat",
      }),
    });
  const [messageTimestamps, setMessageTimestamps] = useState<Record<string, number>>({});
  const [input, setInput] = useState<LoyalSkill[]>([]);
  const [pendingText, setPendingText] = useState("");
  const [swapFlowState, setSwapFlowState] = useState<{
    isActive: boolean;
    isComplete: boolean;
    swapData: { fromCurrency: string | null; amount: string | null; toCurrency: string | null };
  } | null>(null);
  const [sendFlowState, setSendFlowState] = useState<{
    isActive: boolean;
    isComplete: boolean;
    sendData: { currency: string | null; amount: string | null; walletAddress: string | null };
  } | null>(null);
  const [isChatModeLocal, setIsChatModeLocal] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isInputStuckToBottom, setIsInputStuckToBottom] = useState(false);
  const [stickyInputBottomOffset, setStickyInputBottomOffset] = useState(24);
  const { setIsChatMode } = useChatMode();

  const skillsEnabled = isSkillsEnabled();

  useEffect(() => {
    setIsChatMode(isChatModeLocal);
  }, [isChatModeLocal, setIsChatMode]);

  useEffect(() => {
    if (!skillsEnabled && inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [skillsEnabled, pendingText]);

  const isChatMode = isChatModeLocal;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const menuIconRef = useRef<MenuIconHandle>(null);
  const plusIconRef = useRef<PlusIconHandle>(null);
  const inputRef = useRef<SkillsInputRef>(null);
  const copyIconRefs = useRef<Map<string, CopyIconHandle>>(new Map());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { isConnected } = usePhantom();
  const { open } = useModal();
  const accounts = useAccounts();
  const solanaAddress = accounts?.find((acc) => acc.addressType === "Solana")?.address;

  const truncatedAddress = solanaAddress ? `${solanaAddress.slice(0, 4)}..${solanaAddress.slice(-4)}` : "";
  const [hasPromptedAuth, setHasPromptedAuth] = useState(false);

  useEffect(() => {
    if (!(hasPromptedAuth || isConnected) && pendingText.length > 0) {
      setHasPromptedAuth(true);
      open();
    }
  }, [hasPromptedAuth, isConnected, pendingText, open]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
    return () => {
      document.body.classList.remove("sidebar-open");
    };
  }, [isSidebarOpen]);

  const [isOnline, setIsOnline] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isScrolledToAbout, setIsScrolledToAbout] = useState(false);
  const [isScrolledToRoadmap, setIsScrolledToRoadmap] = useState(false);
  const [isScrolledToLinks, setIsScrolledToLinks] = useState(false);
  const prevScrolledToAbout = useRef(false);
  const prevScrolledToRoadmap = useRef(false);
  const prevScrolledToLinks = useRef(false);

  const hasUsableInput =
    (pendingText.trim().length > 0 || input.length > 0) &&
    (!swapFlowState?.isActive || swapFlowState?.isComplete) &&
    (!sendFlowState?.isActive || sendFlowState?.isComplete);

  useEffect(() => {
    setMessageTimestamps((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const message of messages) {
        if (message.createdAt && next[message.id] !== message.createdAt) {
          next[message.id] = message.createdAt;
          changed = true;
          continue;
        }
        if (!message.createdAt && next[message.id] === undefined) {
          next[message.id] = Date.now();
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [messages]);

  const { getQuote, executeSwap, quote, loading: swapLoading } = useSwap();
  const [showSwapWidget, setShowSwapWidget] = useState(false);
  const [swapStatus, setSwapStatus] = useState<"pending" | "success" | "error" | null>(null);
  const [swapResult, setSwapResult] = useState<{ signature?: string; error?: string } | null>(null);
  const [pendingSwapData, setPendingSwapData] = useState<any>(null);
  const pendingSwapDataRef = useRef<any>(null);

  const { executeSend, loading: sendLoading } = useSend();
  const [showSendWidget, setShowSendWidget] = useState(false);
  const [sendStatus, setSendStatus] = useState<"pending" | "success" | "error" | null>(null);
  const [sendResult, setSendResult] = useState<{ signature?: string; error?: string } | null>(null);
  const [pendingSendData, setPendingSendData] = useState<any>(null);
  const pendingSendDataRef = useRef<any>(null);

  const [nlpState, setNlpState] = useState<any>({ isActive: false, intent: null, parsedData: {} });

  const isLoading = swapLoading || sendLoading || status === "streaming" || status === "submitted";

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    };
    const handleOffline = () => setIsOnline(false);
    setIsOnline(navigator.onLine);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isChatMode && inputRef.current) inputRef.current.focus();
  }, [isChatMode]);

  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        setShowScrollButton(false);
      }, 100);
    }
  }, [messages, status]);

  const handleSwapComplete = (data: any) => {
    pendingSwapDataRef.current = data;
    setPendingSwapData(data);
  };

  const handleSendComplete = (data: any) => {
    pendingSendDataRef.current = data;
    setPendingSendData(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !isConnected || !hasUsableInput) return;
    setIsChatModeLocal(true);
    // Lógica simplificada de envío para el ejemplo completo
    const messageText = pendingText.trim();
    if (messageText) {
      sendMessage({ text: messageText });
      setPendingText("");
    }
  };

  const handleCopyMessage = async (messageId: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleScrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleScrollToAbout = () => {
    const section = document.getElementById("about-section");
    if (section) window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
  };

  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSwapApprove = async () => {
    /* ... */
  };
  const handleSwapCancel = () => {
    setShowSwapWidget(false);
    setPendingSwapData(null);
  };
  const handleSendApprove = async () => {
    /* ... */
  };
  const handleSendCancel = () => {
    setShowSendWidget(false);
    setPendingSendData(null);
  };

  const previousChats = [
    { id: "1", title: "What is quantum computing?" },
    { id: "2", title: "Explain blockchain technology" },
  ];

  return (
    <main
      className={ibmPlexSans.className}
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        overflow: isChatMode ? "hidden" : "auto",
      }}
    >
      <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
        {/* Navigation Bar */}
        {!isChatMode && (
          <nav
            className="hidden md:flex"
            style={{
              position: "fixed",
              top: "1.4375rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 60,
              background: "rgba(38, 38, 38, 0.7)",
              backdropFilter: "blur(48px)",
              borderRadius: "60px",
              padding: "4px",
            }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              {["About", "Roadmap", "Links"].map((label, idx) => (
                <button
                  key={label}
                  onClick={idx === 0 ? handleScrollToAbout : undefined}
                  style={{
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </nav>
        )}

        {/* Sidebar */}
        <div style={{ position: "fixed", top: "8px", left: "8px", bottom: "8px", zIndex: 70 }}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              width: "36px",
              height: "36px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
              color: "#fff",
              cursor: "pointer",
              border: "none",
            }}
          >
            <MenuIcon size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            transition: "margin-left 0.3s",
            marginLeft: isSidebarOpen ? "300px" : "0",
          }}
        >
          {isChatMode && (
            <div
              className="chat-messages-container"
              ref={messagesContainerRef}
              style={{ flex: 1, overflowY: "auto", padding: "100px 20px" }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  style={{
                    marginBottom: "1rem",
                    color: "#fff",
                    textAlign: m.role === "user" ? "right" : "left",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "10px",
                      borderRadius: "10px",
                      background: m.role === "user" ? "#333" : "transparent",
                    }}
                  >
                    <MarkdownRenderer
                      content={m.parts
                        .filter((p) => p.type === "text")
                        .map((p: any) => p.text)
                        .join("")}
                    />
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Botón Scroll corregido */}
          {isChatMode && (
            <button
              aria-label="Scroll to bottom"
              className="scroll-to-bottom-button"
              onClick={handleScrollToBottom}
              style={{
                position: "absolute",
                bottom: "7rem",
                right: "2rem",
                width: "2.5rem",
                height: "2.5rem",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                display: showScrollButton ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ArrowDownIcon color="#fff" />
            </button>
          )}

          {/* Input Principal */}
          <div
            style={{
              position: isChatMode ? "absolute" : "relative",
              bottom: isChatMode ? "20px" : "auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: isChatMode ? "0" : "40vh",
            }}
          >
            {!isChatMode && (
              <Image
                alt="Loyal Privacy"
                height={64}
                src="/Askloyal.png"
                width={307}
                style={{ marginBottom: "2rem" }}
              />
            )}
            <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "700px", padding: "0 20px" }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "20px",
                  padding: "10px",
                  display: "flex",
                }}
              >
                <textarea
                  value={pendingText}
                  onChange={(e) => setPendingText(e.target.value)}
                  placeholder="Ask Loyal Privacy..."
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    outline: "none",
                    resize: "none",
                  }}
                />
                <button type="submit" style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                  <Image alt="Send" src="/send_enabled.svg" width={24} height={24} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {!isChatMode && (
          <>
            <BentoGridSection />
            <RoadmapSection />
            <Footer />
          </>
        )}
      </div>
    </main>
  );
}
