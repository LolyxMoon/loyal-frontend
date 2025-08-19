"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function Header() {{
  return (
    <header className="fixed top-6 right-6 z-10">
      <WalletMultiButton />
    </header>
  );
}}
