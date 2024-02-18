import { exec as execCallback } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import { ethers } from 'ethers';
//@ts-ignore
import Groth16VerifierABI from '../../artifacts/contracts/Verifier.sol/Groth16Verifier.json';

const exec = promisify(execCallback);

const compileCommand = `yarn hardhat compile`;

export const compileSmartContract = async () => {
  console.log('Compiling smart contract');
  try {
    const { stdout, stderr } = await exec(compileCommand);
    console.log('Circuit compiled successfully:', stdout);
    console.error('Compiler output (if any):', stderr);
  } catch (error) {
    console.error('Error compiling smart contract', error);
    throw error;
  }
};

export const deployContract = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(
      'https://scroll-testnet-public.unifra.io'
    );
    if (!process.env.PRIVATE_KEY) throw new Error('PRIVATE_KEY not found');
    const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const Verifier = new ethers.ContractFactory(
      Groth16VerifierABI.abi,
      Groth16VerifierABI.bytecode,
      Wallet
    );
    const verifier = await Verifier.deploy();
    await verifier.waitForDeployment();
    console.log('Verifier deployed at:', await verifier.getAddress());
    return verifier.getAddress();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
