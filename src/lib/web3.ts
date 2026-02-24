"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { arbitrum, mainnet, sepolia, base } from "wagmi/chains"

if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  console.warn("[web3] NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID is not set – WalletConnect will not work")
}

export const wagmiConfig = getDefaultConfig({
  appName: "Aegis Sentinel",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
  chains: [arbitrum, mainnet, sepolia, base],
  ssr: true,
})
