import { useMbWallet } from "@mintbase-js/react";
import ContractForm from "../components/ContractForm";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

const IndexPage = () => {
  const { isConnected, activeAccountId, disconnect } = useMbWallet();

  return (
    <Layout title="Mintbase Contract Manager">
      <main className="bg-light-white">
        {!isConnected ? (
          <div className="h-screen flex justify-center mx-24">
            <Hero />
          </div>
        ) : (
          <div>
            <div className="px-2 md:px-16 py-4 fixed w-full">
              <div className="flex gap-2 w-full items-center justify-end">
                <div className="w-2/3 sm:w-auto truncate">{activeAccountId}</div>
                <button
                  className="font-bold block w-fit py-2 px-4 text-sm rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
                  onClick={disconnect}
                >
                  Disconnect
                </button>
              </div>
            </div>
            <div className="h-screen flex mx-12 md:mx-48 lg:mx-64">
              <ContractForm />
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default IndexPage;
