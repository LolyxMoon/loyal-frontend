"use client";
import {
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

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

export function BentoGridSection() {
  return (
    <section
      id="about-section"
      style={{
        padding: "4rem 1rem",
        background: "#000",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          className={instrumentSerif.className}
          style={{
            fontSize: "3.5rem",
            fontWeight: 400,
            color: "#fff",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          About Loyal
        </h2>
        <p
          className={instrumentSerif.className}
          style={{
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.8)",
            textAlign: "center",
            marginBottom: "3rem",
            maxWidth: "800px",
            margin: "0 auto 3rem",
            lineHeight: 1.45,
          }}
        >
          Discover the power of private AI conversations with cutting-edge
          technology
        </p>
        <BentoGrid className="mx-auto max-w-4xl md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              className={cn("[&>p:text-lg]", item.className)}
              description={item.description}
              header={item.header}
              icon={item.icon}
              key={i}
              title={item.title}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 bg-dot-white/[0.2]"
      initial="initial"
      whileHover="animate"
    >
      <motion.div
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-700 bg-neutral-900 p-2"
        variants={variants}
      >
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-neutral-800" />
      </motion.div>
      <motion.div
        className="ml-auto flex w-3/4 flex-row items-center space-x-2 rounded-full border border-neutral-700 bg-neutral-900 p-2"
        variants={variantsSecond}
      >
        <div className="h-4 w-full rounded-full bg-neutral-800" />
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
      </motion.div>
      <motion.div
        className="flex flex-row items-center space-x-2 rounded-full border border-neutral-700 bg-neutral-900 p-2"
        variants={variants}
      >
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
        <div className="h-4 w-full rounded-full bg-neutral-800" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      animate="animate"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 bg-dot-white/[0.2]"
      initial="initial"
      whileHover="hover"
    >
      {arr.map((_, i) => (
        <motion.div
          className="flex h-4 w-full flex-row items-center space-x-2 rounded-full border border-neutral-700 bg-neutral-900 p-2"
          key={"skelenton-two" + i}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          variants={variants}
        />
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      animate="animate"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 rounded-lg bg-dot-white/[0.2]"
      initial="initial"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
      variants={variants}
    >
      <motion.div className="h-full w-full rounded-lg" />
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      animate="animate"
      className="flex h-full min-h-[6rem] w-full flex-1 flex-row space-x-2 bg-dot-white/[0.2]"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900 p-4"
        variants={first}
      >
        <img
          alt="avatar"
          className="h-10 w-10 rounded-full"
          height="100"
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          width="100"
        />
        <p className="mt-4 text-center font-semibold text-neutral-300 text-xs sm:text-sm">
          Just code in Vanilla Javascript
        </p>
        <p className="mt-4 rounded-full border border-red-500 bg-red-900/20 px-2 py-0.5 text-red-400 text-xs">
          Delusional
        </p>
      </motion.div>
      <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900 p-4">
        <img
          alt="avatar"
          className="h-10 w-10 rounded-full"
          height="100"
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          width="100"
        />
        <p className="mt-4 text-center font-semibold text-neutral-300 text-xs sm:text-sm">
          Tailwind CSS is cool, you know
        </p>
        <p className="mt-4 rounded-full border border-green-500 bg-green-900/20 px-2 py-0.5 text-green-400 text-xs">
          Sensible
        </p>
      </motion.div>
      <motion.div
        className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900 p-4"
        variants={second}
      >
        <img
          alt="avatar"
          className="h-10 w-10 rounded-full"
          height="100"
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          width="100"
        />
        <p className="mt-4 text-center font-semibold text-neutral-300 text-xs sm:text-sm">
          I love angular, RSC, and Redux.
        </p>
        <p className="mt-4 rounded-full border border-orange-500 bg-orange-900/20 px-2 py-0.5 text-orange-400 text-xs">
          Helpless
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="flex h-full min-h-[6rem] w-full flex-1 flex-col space-y-2 bg-dot-white/[0.2]"
      initial="initial"
      whileHover="animate"
    >
      <motion.div
        className="flex flex-row items-start space-x-2 rounded-2xl border border-neutral-700 bg-neutral-900 p-2"
        variants={variants}
      >
        <img
          alt="avatar"
          className="h-10 w-10 rounded-full"
          height="100"
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          width="100"
        />
        <p className="text-neutral-300 text-xs">
          There are a lot of cool framerworks out there like React, Angular,
          Vue, Svelte that can make your life ....
        </p>
      </motion.div>
      <motion.div
        className="ml-auto flex w-3/4 flex-row items-center justify-end space-x-2 rounded-full border border-neutral-700 bg-neutral-900 p-2"
        variants={variantsSecond}
      >
        <p className="text-neutral-300 text-xs">Use PHP.</p>
        <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "AI Content Generation",
    description: (
      <span className="text-sm">
        Experience the power of AI in generating unique content.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Automated Proofreading",
    description: (
      <span className="text-sm">
        Let AI handle the proofreading of your documents.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Contextual Suggestions",
    description: (
      <span className="text-sm">
        Get AI-powered suggestions based on your writing context.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sentiment Analysis",
    description: (
      <span className="text-sm">
        Understand the sentiment of your text with AI analysis.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Text Summarization",
    description: (
      <span className="text-sm">
        Summarize your lengthy documents with AI technology.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
