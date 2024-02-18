import useContractStore from "@/store";
import UFIContract from "@/assets/contracts/UFI.json";
import {
  useAddress,
  useContract,
  useSigner,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Contract } from "ethers";
import Loader from "@/components/ui/Loader";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FourthStep(props: Props): JSX.Element {
  const { contract } = useContract(
    "0x2C9678042D52B97D27f2bD2947F7111d93F3dD0D",
    "token"
  );
  const address = useAddress();
  const { data } = useTokenBalance(contract, address);
  const [isLoading, setIsLoading] = useState(false);
  const { responseData } = useContractStore();
  const signer = useSigner();
  console.log(responseData);

  useEffect(() => {
    async function sendTransaction() {
      if (!responseData) return;
      setIsLoading(true);

      try {
        const contract = new Contract(
          "0x23302a4f559398b68CDb1F5660a2D12032B70342",
          UFIContract.abi,
          signer
        );

        // Example call to contract function
        const tx = await contract.loanRequest(
          10000000,
          responseData.verifierContract,
          responseData.solidityCallData[0],
          responseData.solidityCallData[1],
          responseData.solidityCallData[2],
          responseData.solidityCallData[3]
        );

        await tx.wait();
        toast.success("Loan request successful!");
        setIsLoading(false);
      } catch (error) {
        console.error("Error during loan request:", error);
        setIsLoading(false);
        toast.error("Failed to request loan. Please try again.");
      }
    }

    sendTransaction();
  }, [responseData]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-8 flex-col items-center text-center">
        <h1 className="accent">Applying for loan</h1>
        {isLoading ? (
          <Loader />
        ) : (
          `Your account balance is: ${Number(data?.value) / 10 ** 6} USDC`
        )}
      </div>
    </div>
  );
}
