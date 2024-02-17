import fs from 'fs';
import { exec as execCallback } from 'child_process';
import path from 'path';
import { promisify } from 'util';

const exec = promisify(execCallback);

const templatePath = path.join(
  __dirname,
  './circom/credit_score_template.circom'
);
const outputPath = path.join(__dirname, './circom/credit_score.circom');
const node_modules_path = path.join(__dirname, '../../../node_modules');
const input_path = path.join(__dirname, './circom/input.json');
const generate_witness_path = path.join(
  __dirname,
  './circom/credit_score_js/generate_witness.js'
);
const r1cs_path = path.join(__dirname, './circom/credit_score.r1cs');
const wasm_path = path.join(
  __dirname,
  './circom/credit_score_js/credit_score.wasm'
);
const witness_path = path.join(
  __dirname,
  './circom/credit_score_js/witness.wtns'
);

const pot_20_path = path.join(
  __dirname,
  './circom/powersoftau/pot20_final.ptau'
);
const zkey0_path = path.join(
  __dirname,
  './circom/credit_score_js/credit_score_0000.zkey'
);
const zkey1_path = path.join(
  __dirname,
  './circom/credit_score_js/credit_score_0001.zkey'
);
const verification_key_path = path.join(
  __dirname,
  './circom/credit_score_js/verification_key.json'
);
const public_json_path = path.join(
  __dirname,
  './circom/credit_score_js/public.json'
);
const proof_path = path.join(__dirname, './circom/credit_score_js/proof.json');

const verifier_smart_contract_path = path.join(
  __dirname,
  './circom/credit_score_js/verifier.sol'
);

const circomCommand = `circom ${outputPath}  --r1cs --wasm -l ${node_modules_path} -o ${path.dirname(
  outputPath
)}`;

const witnessCommand = `node ${generate_witness_path} ${wasm_path} ${input_path} ${witness_path}`;

const zkeyCommand = `snarkjs groth16 setup ${r1cs_path} ${pot_20_path} ${zkey0_path}`;

const contributeCommand = `snarkjs zkey contribute ${zkey0_path} ${zkey1_path} --name="Proof of Fun" -v`;

const exportVerificationKeyCommand = `snarkjs zkey export verificationkey ${zkey1_path} ${verification_key_path}`;

const generateProofCommand = `snarkjs groth16 prove ${zkey1_path} ${witness_path} ${proof_path} ${public_json_path}`;

const verifyProofCommand = `snarkjs groth16 verify ${verification_key_path} ${public_json_path} ${proof_path}`;

const generateVerifierCommand = `snarkjs zkey export solidityverifier ${zkey1_path} ${verifier_smart_contract_path}`;

type CircuitParameters = {
  p_max_header_bytes: number;
  p_max_body_bytes: number;
  p_n: number;
  p_k: number;
  p_pack_size: number;
  p_expose_from: number;
  p_expose_to: number;
};

export const initializeCircuit = async (parameters: CircuitParameters) => {
  const template = fs.readFileSync(templatePath, 'utf-8');
  let circuit = template;
  for (const [key, value] of Object.entries(parameters)) {
    //@ts-ignore
    circuit = circuit.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }

  fs.writeFileSync(outputPath, circuit);
};

export const compileCircuit = async () => {
  console.log('Compiling circuit');
  try {
    // Replace this command with your actual circom compilation command
    const { stdout, stderr } = await exec(circomCommand);
    console.log('Circuit compiled successfully:', stdout);
    console.error('Compiler output (if any):', stderr);

    // Proceed with witness calculation or any other operations after successful compilation
  } catch (error) {
    // Handle errors that occurred during execution
    console.error('Error compiling circuit:', error);
  }
};

export const generateWitness = async () => {
  console.log('Generating witness');
  try {
    // Replace this command with your actual witness generation command
    const { stdout, stderr } = await exec(witnessCommand);
    console.log('Witness generated successfully:', stdout);
    console.error('Witness generation output (if any):', stderr);
    // Proceed with zkSnark proof generation or any other operations after successful witness generation
  } catch (error) {
    // Handle errors that occurred during execution
    console.error('Error generating witness:', error);
    throw error;
  }
};

export const generateZKey = async () => {
  console.log('Generating zKey');
  try {
    // Replace this command with your actual witness generation command
    const { stdout, stderr } = await exec(zkeyCommand);
    console.log('zKey generated successfully:', stdout);
    console.error('zKey generation output (if any):', stderr);

    // Proceed with zkSnark proof generation or any other operations after successful witness generation
  } catch (error) {
    // Handle errors that occurred during execution
    console.error('Error generating zKey:', error);
    throw error;
  }
};

export const contributeToPhase2 = async () => {
  console.log('Contribution to phase 2');
  try {
    // Replace this command with your actual witness generation command
    const { stdout, stderr } = await exec(contributeCommand);
    console.log('Contribution to phase 2 successful:', stdout);
    console.error('Contribution to phase 2 output (if any):', stderr);

    // Proceed with zkSnark proof generation or any other operations after successful witness generation
  } catch (error) {
    // Handle errors that occurred during execution
    console.error('Error Contribution to phase 2:', error);
    throw error;
  }
};

export const exportVerificationKey = async () => {
  console.log('Exporting verification Key');
  try {
    // Replace this command with your actual witness generation command
    const { stdout, stderr } = await exec(exportVerificationKeyCommand);
    console.log('Verification Key exported successfully:', stdout);
    console.error('verification Key export output (if any):', stderr);

    // Proceed with zkSnark proof generation or any other operations after successful witness generation
  } catch (error) {
    // Handle errors that occurred during execution
    console.error('Error exporting verification Key:', error);
    throw error;
  }
};

export const generateProof = async () => {
  console.log('Generating proof');
  try {
    // Replace this command with your actual witness generation command
    const { stdout, stderr } = await exec(generateProofCommand);
    console.log('Proof generated successfully:', stdout);
    console.error('Proof generation output (if any):', stderr);

    // Proceed with zkSnark proof generation or any other operations after successful witness generation
  } catch (error) {
    // Handle errors that occurred during execution
    console.error('Error generating proof:', error);
    throw error;
  }
};

export const verifyProof = async () => {
  console.log('Verifying proof');
  try {
    // Replace this command with your actual witness generation command
    const { stdout, stderr } = await exec(verifyProofCommand);
    console.log('Proof verified successfully:', stdout);
    console.error('Proof verification output (if any):', stderr);

    // Proceed with zkSnark proof generation or any other operations after successful witness generation
  } catch (error) {
    // Handle errors that occurred during execution
    console.error('Error verifying proof:', error);
    throw error;
  }
};

export const exportCircuitData = () => {
  const jsonFiles = ['public.json', 'proof.json', 'verification_key.json'];
  const basePath = path.join(__dirname, './circom/credit_score_js/');
  let combinedData = {};

  for (const file of jsonFiles) {
    const filePath = path.join(basePath, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    // @ts-ignore
    combinedData[path.basename(file, '.json')] = data;
  }

  return combinedData;
};

export const generateVerificationSmartContract = async () => {
  console.log('Generating verification smart contract');
  try {
    // Replace this command with your actual witness generation command
    const { stdout, stderr } = await exec(generateVerifierCommand);
    console.log('Verification smart contract generated successfully:', stdout);
    console.error(
      'Verification smart contract generation output (if any):',
      stderr
    );

    // Proceed with zkSnark proof generation or any other operations after successful witness generation
  } catch (error) {
    // Handle errors that occurred during execution
    console.error('Error generating verification smart contract:', error);
    throw error;
  }
};
