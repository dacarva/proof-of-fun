import { useAddress } from "@thirdweb-dev/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/ui/Loader";
import useContractStore from "@/store";

type Props = {
  setScoreProved: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmlFileForm(props: Props): JSX.Element {
  const { setResponseData } = useContractStore();
  const { setScoreProved } = props;
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = event.target.files ? event.target.files[0] : null;
    if (inputFile && isValidEmlFile(inputFile)) {
      setFile(inputFile);
    } else {
      setFile(null);
      toast.error("Please upload a valid .eml file");
    }
  };

  const isValidEmlFile = (file: File) => {
    if (file.type === "message/rfc822" || file.type === "application/eml") {
      return true;
    }

    if (file === undefined) {
      return false;
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    return fileExtension === "eml";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (file) {
        formData.append("emailFile", file);
        const userInfo = {
          address: address,
        };
        formData.append("userInfo", JSON.stringify(userInfo));
      } else {
        throw new Error("File not selected. Please select a file.");
      }
      formData.append("emailFile", file);

      const response = await fetch(
        "https://octopus-summary-perfectly.ngrok-free.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setResponseData(data);

      if (response.ok) {
        setScoreProved(true);
        toast.success("File uploaded successfully!");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex text-left flex-col">
      <p>
        Now please download the email we sent you (.eml file) and upload it here
        in order to verify your credit score through a zk-proof:
      </p>
      <div className="flex flex-col justify-center gap-3">
        <input
          type="file"
          maxLength={1}
          className="grow my-3"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="btn btn-primary whitespace-nowrap min-w-[120px] flex justify-center self-center w-fit"
          disabled={file === null || isLoading}
        >
          {isLoading ? <Loader /> : "Verify Credit Score"}
        </button>
      </div>
    </form>
  );
}
