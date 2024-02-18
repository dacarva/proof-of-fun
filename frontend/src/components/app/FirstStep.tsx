import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function FirstStep(props: Props): JSX.Element {
  const { setCurrentStep } = props;
  const address = useAddress();

  return (
    <div className="flex flex-col">
      <div className="flex gap-8 flex-col items-center text-center">
        <h1 className="accent">Connect Your Wallet</h1>
        <p className="text-gray-300">
          The wallet you connect with is going to be the wallet we will link to
          the email verification and also the one we will distribute the loan to
          if approved.
        </p>
        <ConnectWallet />
      </div>
      <button
        onClick={() => setCurrentStep((prev) => prev + 1)}
        className="btn btn-primary mt-16 self-end"
        disabled={!address}
      >
        Next
      </button>
    </div>
  );
}
