import { useMbWallet } from "@mintbase-js/react";

const Hero = () => {
  const { connect } = useMbWallet();

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="text-center">
        <p className="font-bold text-5xl text-light-black">
          Manage your{" "}
          <a
            className="inline-block text-light-green cursor-pointer transform transition duration-500 hover:-translate-y-1"
            href="https://mintbase.io"
            target="_blank"
          >
            Mintbase
          </a>{" "}
          smart contract
        </p>
        <p className="text-2xl mt-2 text-dark-gray">
          Simple tool to manage Mintbase smart contracts (stores) you own.
        </p>
      </div>

      <a
        className="block w-fit py-4 px-6 rounded-full bg-light-green text-white cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
        onClick={connect}
      >
        Connect your wallet
      </a>
    </div>
  );
};

export default Hero;
