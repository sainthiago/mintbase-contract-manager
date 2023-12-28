import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useApollo } from "../services/apolloClient";

import "tailwindcss/tailwind.css";

import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import { Network } from "mintbase";
import {
  GRAPH_MAINNET_HTTPS_URI,
  GRAPH_TESTNET_HTTPS_URI,
} from "../constants/mintbase";

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
    <MintbaseWalletContextProvider
      contractAddress="hellovirtualworld.mintspace2.testnet"
      network={networkDetails as Network}
    >
      <ApolloProvider client={apolloClient(networkDetails)}>
        <Component {...pageProps} />
      </ApolloProvider>
    </MintbaseWalletContextProvider>
  );
}
export default MyApp;
