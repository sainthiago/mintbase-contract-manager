import Link from "next/link";
import ContractForm from "../components/ContractForm";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { useWallet } from "../services/providers/MintbaseWalletContext";

const WalletCallbackPage = () => {
  const { wallet } = useWallet();

  return (
    <Layout title="Mintbase Contract Manager">
      <main className="bg-light-white">
        <div className="h-screen flex justify-center items-center mx-24">
          <div>
            <Link href="/" passHref>
              <a className="block w-fit py-4 px-6 rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black">
                Go Home
              </a>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default WalletCallbackPage;
