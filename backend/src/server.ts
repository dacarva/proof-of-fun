/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import busboy from 'busboy';
import cors from 'cors';

import nodemailer from 'nodemailer';

import { getCircuitInputs } from '../src/util/circuit';
import { getRandomNumber } from './util/misc';
import {
  compileCircuit,
  initializeCircuit,
  generateWitness,
  generateZKey,
  contributeToPhase2,
  exportVerificationKey,
  generateProof,
  verifyProof,
  exportCircuitData,
  generateVerificationSmartContract,
} from './services/CircuitService';
import {
  compileSmartContract,
  deployContract,
} from './services/BlockchainService';

const app = express();

app.use(cors());
app.use(express.json()); // Make sure this line is before any route definitions
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com', //'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL, //'your email',
    pass: process.env.EMAIL_PASSWORD, //'your password',
  },
});

// Define a route for the root path ("/")
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/request-credit-score', async (req, res) => {
  const { name, email } = req.body;
  const score = getRandomNumber(10, 99);
  try {
    await transporter.sendMail({
      from: '"Unknown Finance" <unknown.finance@zohomail.com>', // Sender address
      to: email, // List of receivers
      subject: 'Your Credit Score', // Subject line
      text: `Hello! ${name} \n\nYour credit score is: ${score}`, // Plain text body
    });
    res.send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

app.post('/upload', (req, res) => {
  let responseSent = false; // Flag to track response status
  let circuitInputs: any = null;
  let entireFile: Buffer;
  let ethAddress: string;
  try {
    const bb = busboy({ headers: req.headers });

    bb.on('file', async (name, file, info) => {
      const buffers: Buffer[] = [];
      file.on('data', (data) => {
        buffers.push(data);
      });
      file.on('end', async () => {
        if (name === 'emailFile') {
          entireFile = Buffer.concat(buffers);
        }
      });
    });

    bb.on('field', (name, val, info) => {
      if (name === 'userInfo') {
        const userInfo = JSON.parse(val);
        ethAddress = userInfo.address;
      }
    });

    bb.on('finish', async () => {
      if (!responseSent) {
        try {
          const circuitInputs = await getCircuitInputs(entireFile, ethAddress);

          if (!circuitInputs) throw new Error('No circuit inputs');
          const parameters = {
            p_max_header_bytes: circuitInputs.in_padded_length,
            p_max_body_bytes: circuitInputs.in_body_padded_length,
            p_n: 121,
            p_k: 17,
            p_pack_size: 2,
            p_expose_from: 0,
            p_expose_to: 0,
          };

          const ENV = process.env.NODE_ENV;
          if (ENV !== 'development') {
            await initializeCircuit(parameters);
            await compileCircuit();
            await generateZKey();
            await contributeToPhase2();
            await exportVerificationKey();
          }
          // await generateWitness();
          // await generateProof();
          // await verifyProof();
          // await generateVerificationSmartContract();
          // await compileSmartContract();
          const verifierContract = await deployContract();

          const combinedData = exportCircuitData();
          res.json({
            ...combinedData,
            verifierContract,
          });
          responseSent = true;
        } catch (error) {
          console.error('Error during circuit processing:', error);
          if (!responseSent) {
            res.status(500).send({
              error: 'Error processing request',
              details: error.message,
            });
            responseSent = true;
          }
        }
      }
    });
    bb.on('error', (err) => {
      if (!responseSent) {
        console.error('File upload error:', err);
        res.status(500).send(`File upload failed with error: ${err}`);
        responseSent = true;
      }
    });
    req.pipe(bb);
  } catch (error) {
    if (!responseSent) {
      console.error('Error setting up file upload:', error);
      res.status(500).send(`Setup error: ${error.message}`);
    }
  }
});

// Start the server and listen on port 3001
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

export default app;
