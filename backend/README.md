## Connecting to backend

URL: https://octopus-summary-perfectly.ngrok-free.app/

Endpoint: /upload

Payload:

```js
const uri = 'https://octopus-summary-perfectly.ngrok-free.app';
const formData = new FormData();
if (fileState.file) {
  formData.append('emailFile', fileState.file);
  const userInfo = {
    address: '0x123....', // User address
  };
  formData.append('userInfo', JSON.stringify(userInfo));
} else {
  // Handle the case where the file is not set
  throw new Error('File not selected. Please select a file.');
}
formData.append('emailFile', fileState.file);

const response = await fetch(`${uri}/upload`, {
  method: 'POST',
  body: formData,
});

if (response.ok) {
  setMessage('File uploaded successfully!');
} else {
  setMessage('Error uploading file. Please try again.');
}
```

Your response should be a JSON object containing the verification key object, the input of the verification circuit, the cryptographic proof of the circuit and the address of the deployed smart contract in Scroll Sepolia

## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

## Available Scripts

### `npm run dev`

Run the server in development mode.

### `npm test`

Run all unit-tests with hot-reloading.

### `npm test -- --testFile="name of test file" (i.e. --testFile=Users).`

Run a single unit-test.

### `npm run test:no-reloading`

Run all unit-tests without hot-reloading.

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build (Must be built first).

### `npm start -- --env="name of env file" (default is production).`

Run production build with a different env file.

## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`.

```

```
