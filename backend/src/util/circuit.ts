import fs from 'fs';
import path from 'path';
import { verifyDKIMSignature } from '@zk-email/helpers/dist/dkim';
import { generateCircuitInputs, sha256Pad } from '@zk-email/helpers/';
import { bytesToBigInt, fromHex, findSelector } from './misc';

export const getCircuitInputs = async (file: Buffer, ethAddress: string) => {
  // Do something with the file
  const MAX_BODY_PADDED_BYTES = 512;
  const STRING_PRESELECTOR = 'Your credit score is: ';
  try {
    const dkimResult = await verifyDKIMSignature(file);
    const circuitInputs = {
      ...generateCircuitInputs({
        rsaSignature: dkimResult.signature,
        rsaPublicKey: dkimResult.publicKey,
        body: dkimResult.body,
        bodyHash: dkimResult.bodyHash,
        message: dkimResult.message,
        maxMessageLength: 576,
        maxBodyLength: 512,
        shaPrecomputeSelector: STRING_PRESELECTOR,
      }),
    };

    const address = bytesToBigInt(fromHex(ethAddress)).toString();
    //@ts-ignore
    circuitInputs.address = address;

    const selector = STRING_PRESELECTOR.split('').map((char) =>
      char.charCodeAt(0)
    );
    const calc_length =
      Math.floor((dkimResult.body.length + 63 + 65) / 64) * 64;
    const [bodyPadded] = await sha256Pad(
      dkimResult.body,
      Math.max(MAX_BODY_PADDED_BYTES, calc_length)
    );

    const shaCutoffIndex =
      Math.floor((await findSelector(bodyPadded, selector)) / 64) * 64;
    const bodyRemaining = bodyPadded.slice(shaCutoffIndex);
    const CREDIT_SCORE_SELECTOR = Buffer.from(STRING_PRESELECTOR);
    const credit_score_idx = (
      Buffer.from(bodyRemaining).indexOf(CREDIT_SCORE_SELECTOR) +
      CREDIT_SCORE_SELECTOR.length
    ).toString();
    //@ts-ignore
    circuitInputs.credit_score_idx = credit_score_idx;
    if (!circuitInputs.in_body_padded?.length) throw new Error('No body');
    const filePath = path.join(__dirname, '../services/circom/input.json');
    const jsonData = JSON.stringify(circuitInputs);
    fs.writeFileSync(filePath, jsonData);

    return {
      circuitInputs,
      in_padded_length: circuitInputs.in_padded.length,
      message_length: dkimResult.message.length,
      body_length: dkimResult.body.length,
      in_body_padded_length: circuitInputs.in_body_padded.length,
    };
  } catch (error) {
    console.error('Error processing file:', error);
    return null;
  }
};
