import { RPC_MAINNET, RPC_TESTNET } from "../constants/mintbase";

export const getCurrentRpc = () => {
  return localStorage.getItem("network") === "testnet"
    ? RPC_TESTNET
    : RPC_MAINNET;
};
