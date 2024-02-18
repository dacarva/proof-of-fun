import { MyStore } from "@/types";
import { create } from "zustand";

const useContractStore = create<MyStore>((set) => ({
  responseData: null,
  setResponseData: (data) => set({ responseData: data }),
}));

export default useContractStore;
