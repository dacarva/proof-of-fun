import useContractStore from "@/store";
import VerifierContract from "@/assets/contracts/Verifier.json";
import { useContract, useContractRead } from "@thirdweb-dev/react";
type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FourthStep(props: Props): JSX.Element {
  const { responseData } = useContractStore();
  const { contract } = useContract(
    responseData?.verifierContract,
    VerifierContract.abi
  );
  const { data, isLoading, error } = useContractRead(contract, "verifyProof", [
    responseData?.solidityCallData[0],
    responseData?.solidityCallData[1],
    responseData?.solidityCallData[2],
    responseData?.solidityCallData[3],
  ]);
  // const { setCurrentStep } = props;

  //   const testSmartContract = async () => {
  // };

  console.log(data, isLoading, error);

  return (
    <div className="flex flex-col">
      <div className="flex gap-8 flex-col items-center text-center">
        <h1 className="accent">Apply for loan</h1>
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem vel
          iusto modi illo voluptatibus. Aut error quae vel ducimus magni fugiat!
          Eum maiores impedit corporis. Quo amet quam laborum impedit?
        </p>
      </div>
    </div>
  );
}
