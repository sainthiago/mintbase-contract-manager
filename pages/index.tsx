import ContractForm from "../components/ContractForm";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { useWallet } from "../services/providers/MintbaseWalletContext";

const IndexPage = () => {
  const { wallet } = useWallet();
  return (
    <Layout title="Mintbase Contract Manager">
      <main className="bg-light-white">
        <div className="h-screen flex justify-center mx-24">
          {wallet?.isConnected && wallet?.activeAccount ? (
            <ContractForm />
          ) : (
            <Hero />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default IndexPage;
