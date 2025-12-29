"use client";

import { Repeat2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { AVAILABLE_SKILLS, type LoyalSkill } from "@/types/skills";

const ACTION_SKILLS = AVAILABLE_SKILLS.filter((s) => s.category === "action");

type SkillsSelectorProps = {
  selectedSkillId?: string;
  onSkillSelect: (skill: LoyalSkill | null) => void;
  className?: string;
  nlpState?: {
    isActive: boolean;
    intent: "send" | "swap" | null;
    parsedData: {
      amount: string | null;
      currency: string | null;
      currencyMint: string | null;
      currencyDecimals: number | null;
      walletAddress: string | null;
      toCurrency: string | null;
      toCurrencyMint: string | null;
      toCurrencyDecimals: number | null;
    };
  };
};

const getSkillIcon = (skillId: string) => {
  switch (skillId) {
    case "send": {
      return <Send className="h-4 w-4 opacity-60" />;
    }
    case "swap": {
      return <Repeat2 className="h-4 w-4 opacity-60" />;
    }
    default: {
      return null;
    }
  }
};

export function SkillsSelector({
  selectedSkillId,
  onSkillSelect,
  className,
  nlpState,
}: SkillsSelectorProps) {
  const handleButtonClick = (skill: LoyalSkill) => {
    // If clicking the currently selected skill, deactivate it
    if (selectedSkillId === skill.id) {
      onSkillSelect(null);
    } else {
      // Otherwise, activate this skill
      onSkillSelect(skill);
    }
  };

  if (nlpState?.isActive) {
    const isSwap = nlpState.intent === "swap";
    const isReady = isSwap
      ? nlpState.parsedData.amount &&
        nlpState.parsedData.currency &&
        nlpState.parsedData.toCurrency
      : nlpState.parsedData.amount &&
        nlpState.parsedData.currency &&
        nlpState.parsedData.walletAddress;

    return (
      <div
        className={cn("flex flex-col gap-1.5 md:flex-row md:gap-2", className)}
      >
        {/* Intent Pill (Send or Swap) */}
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-medium text-xs md:px-3 md:py-1.5 md:text-sm",
            "shadow-lg backdrop-blur-[18px]",
            isSwap
              ? "border-red-400/40 bg-gradient-to-br from-red-400/25 to-red-500/50 text-white"
              : "border-red-400/40 bg-gradient-to-br from-red-400/25 to-red-500/50 text-white"
          )}
        >
          {isSwap ? <Repeat2 size={14} /> : <Send size={14} />}
          {isSwap ? "Swap" : "Send"}
        </span>

        {/* Amount Pill */}
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-medium text-xs md:px-3 md:py-1.5 md:text-sm",
            "shadow-lg backdrop-blur-[18px]",
            nlpState.parsedData.amount
              ? "border-green-400/40 bg-green-400/25 text-white"
              : "border-white/10 border-dashed bg-white/5 text-white/50"
          )}
        >
          {nlpState.parsedData.amount || "Amount"}
        </span>

        {/* Currency Pill (From) */}
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-medium text-xs md:px-3 md:py-1.5 md:text-sm",
            "shadow-lg backdrop-blur-[18px]",
            nlpState.parsedData.currency
              ? "border-white/25 bg-white/10 text-white"
              : "border-white/10 border-dashed bg-white/5 text-white/50"
          )}
        >
          {nlpState.parsedData.currency || "Currency"}
        </span>

        {/* To Address OR To Currency Pill */}
        {isSwap ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-medium text-xs md:px-3 md:py-1.5 md:text-sm",
              "shadow-lg backdrop-blur-[18px]",
              nlpState.parsedData.toCurrency
                ? "border-blue-400/40 bg-blue-400/25 text-white"
                : "border-white/10 border-dashed bg-white/5 text-white/50"
            )}
          >
            {nlpState.parsedData.toCurrency || "To Token"}
          </span>
        ) : (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 font-medium text-xs md:px-3 md:py-1.5 md:text-sm",
              "shadow-lg backdrop-blur-[18px]",
              nlpState.parsedData.walletAddress
                ? "border-blue-400/40 bg-blue-400/25 text-white"
                : "border-white/10 border-dashed bg-white/5 text-white/50"
            )}
            title={nlpState.parsedData.walletAddress || undefined}
          >
            {nlpState.parsedData.walletAddress
              ? nlpState.parsedData.walletAddress.length > 12
                ? `${nlpState.parsedData.walletAddress.slice(0, 6)}...${nlpState.parsedData.walletAddress.slice(-4)}`
                : nlpState.parsedData.walletAddress
              : "To Address"}
          </span>
        )}

        {/* Ready Hint */}
        {isReady && (
          <span className="flex animate-pulse items-center font-medium text-white text-xs md:ml-auto">
            Ready to execute
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {ACTION_SKILLS.map((skill) => {
        const isActive = selectedSkillId === skill.id;

        return (
          <button
            className={cn(
              "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[32px] px-4 py-1.5 text-sm transition-all",
              "text-white",
              isActive
                ? "bg-white/15 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.08),0px_4px_24px_0px_rgba(0,0,0,0.12)]"
                : "bg-white/10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04),0px_4px_24px_0px_rgba(0,0,0,0.08)] hover:bg-white/15",
              "focus:outline-none"
            )}
            key={skill.id}
            onClick={() => {
              handleButtonClick(skill);
            }}
            type="button"
          >
            {getSkillIcon(skill.id)}
            {skill.label}
          </button>
        );
      })}
    </div>
  );
}
