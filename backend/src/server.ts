/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import busboy from 'busboy';
import cors from 'cors';
import { getCircuitInputs } from '../src/util/circuit';

const app = express();

app.use(cors());

// Define a route for the root path ("/")
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/upload', (req, res) => {
  const bb = busboy({ headers: req.headers });
  let responseSent = false; // Flag to track response status
  let circuitInputs: any = null;
  let entireFile: Buffer;
  let ethAddress: string;

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
      const circuitInputs = await getCircuitInputs(entireFile, ethAddress);
      res.send('File uploaded and processed successfully.');
      responseSent = true;
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
});

// Start the server and listen on port 3001
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});

export default app;
