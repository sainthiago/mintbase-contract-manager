import ContractForm from "../components/ContractForm";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { useWallet } from "../services/providers/MintbaseWalletContext";

const IndexPage = () => {
  const { wallet } = useWallet();

  return (
    <Layout title="Mintbase Contract Manager">
      <main className="bg-light-white">
        {!wallet?.isConnected() ? (
          <div className="h-screen flex justify-center mx-24">
            <Hero />
          </div>
        ) : (
          <div className="h-screen flex mx-24">
            <ContractForm />
          </div>
        )}
      </main>
    </Layout>
  );
};

export default IndexPage;
