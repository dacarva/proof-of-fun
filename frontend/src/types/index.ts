export type Step = {
  title: string;
  description: string;
  icon: JSX.Element;
};

export type ResponseData = {
  public: number[];
  proof: {
    curve: string;
    pi_a: string[];
    pi_b: [string[], string[], string[]];
    pi_c: string[];
    protocol: string;
  };
  verification_key: {
    protocol: string;
    curve: string;
    nPublic: number;
    vk_alpha_1: string[];
    vk_beta_2: string[];
    // Add other properties as needed
  };
  verifierContract: string;
  solidityCallData: [string[], string[], string[], string[]];
  // Add other properties as needed
};

export type MyStore = {
  responseData: ResponseData | null;
  setResponseData: (data: ResponseData) => void;
};
