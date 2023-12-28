import { useMbWallet } from "@mintbase-js/react";
import ContractForm from "../components/ContractForm";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

const IndexPage = () => {
  const { isConnected } = useMbWallet();

  return (
    <Layout title="Mintbase Contract Manager">
      <main className="bg-light-white">
        {isConnected ? (
          <div className="h-screen flex justify-center mx-24">
            <Hero />
          </div>
        ) : (
          <div className="h-screen flex mx-12 md:mx-48 lg:mx-64">
            <ContractForm />
          </div>
        )}
      </main>
    </Layout>
  );
};

export default IndexPage;
