import { NearRPC } from "near-wallet-validator";

export const getCurrentRpc = () => {
  return localStorage.getItem("network") === "testnet"
    ? NearRPC.TESTNET
    : NearRPC.MAINNET;
};
