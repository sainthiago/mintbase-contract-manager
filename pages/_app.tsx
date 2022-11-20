import type { AppProps } from "next/app";
import { WalletProvider } from "../services/providers/MintbaseWalletContext";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../services/apolloClient";

import "tailwindcss/tailwind.css";

import {
  GRAPH_MAINNET_HTTPS_URI,
  GRAPH_TESTNET_HTTPS_URI,
} from "../constants/mintbase";
import { Network } from "mintbase";

function MyApp({ Component, pageProps }: AppProps) {
  
  const apolloClient = (network) =>
    useApollo({
      ...pageProps,
      network: {
        graphUri:
          network === "testnet"
            ? GRAPH_TESTNET_HTTPS_URI
            : GRAPH_MAINNET_HTTPS_URI,
      },
    });

  if (typeof window === "undefined") return null;

  const subdomain = window.location.host;
  const networkDetails = subdomain
    ? subdomain.split(".")[0] === "testnet" ||
      subdomain.split(".")[0].includes("localhost")
      ? Network.testnet
      : Network.mainnet
    : null;

  localStorage.setItem("network", networkDetails);

  return (
    <WalletProvider
      apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ""}
      network={networkDetails as Network}
    >
      <ApolloProvider client={apolloClient(networkDetails)}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletProvider>
  );
}
export default MyApp;
