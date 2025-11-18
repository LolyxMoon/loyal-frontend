"use client";

import { Repeat2, Send, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { AVAILABLE_SKILLS, type LoyalSkill } from "@/types/skills";

const ACTION_SKILLS = AVAILABLE_SKILLS.filter((s) => s.category === "action");

type SkillsSelectorProps = {
  selectedSkillId?: string;
  onSkillSelect: (skill: LoyalSkill | null) => void;
  className?: string;
};

const getSkillIcon = (skillId: string) => {
  switch (skillId) {
    case "send": {
      return <Send className="h-3 w-3" />;
    }
    case "swap": {
      return <Repeat2 className="h-3 w-3" />;
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

  return (
    <div className={cn("flex gap-2", className)}>
      {ACTION_SKILLS.map((skill) => {
        const isActive = selectedSkillId === skill.id;

        return (
          <button
            key={skill.id}
            type="button"
            onClick={() => {
              handleButtonClick(skill);
            }}
            className={cn(
              "px-3 py-1.5 rounded-md border transition-all cursor-pointer",
              "text-white text-xs font-light",
              isActive
                ? "bg-[rgba(255,255,255,0.2)] border-[rgba(255,255,255,0.5)]"
                : "bg-transparent border-[rgba(255,255,255,0.25)]",
              "hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.4)]",
              "focus:outline-none"
            )}
          >
            <span className="flex items-center gap-1.5">
              {!isActive && getSkillIcon(skill.id)}
              {skill.label}
              {isActive && <X className="h-3 w-3" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
