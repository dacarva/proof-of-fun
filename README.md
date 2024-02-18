# Unknown Finance

This is a monorepo for our hackathon project. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and Yarn installed on your machine. This project uses Yarn as the package manager because it's a monorepo.

### Installing

1. Clone the repo
```bash
git clone https://github.com/dacarva/proof-of-fun.git
```
2. Install Yarn packages
   
```bash
yarn
```

## Initialization and setup

### Frontend

Get a Thirdweb ClientID and set the `.env`variable: VITE_TEMPLATE_CLIENT_ID

### Backend

Prior to run the backend you will have to compile the circuit and perform the Groth16 ceremony on that circuit.

Once this is done, store the credit_score_0000.zkey, credit_score_0001.zkey, credit_score.r1cs, credit_score.sym in the /backend/src/circom/credit_score_js folder.

In order to deploy the smart contract you will have to store the `PRIVATE_KEY` variable in the `.env` file. Store the `SENDER_EMAIL` and `EMAIL_PASSWORD` variables in the `.env` file; these variables are meant to work with nodemailer with Zoho Mail, but it can be configured.

### Smart Contracts

1. Deposit funds from a sponsor account in AAVE 
2. Deploy the Ufi.sol in Scroll Sepolia, using the AAVE pool address (0x48914C788295b5db23aF2b5F0B3BE775C4eA9440) and the sponsor address as constrcutor parameters, and get the newly deployed contract address. 
3. Using AAVE use the `approveDelegation` function on the USDC variable debt token (0x6ED2eB0A4141975A8A33558234137265f36055f7). In this case the delegatee is the deployed address of Ufi.sol
4. Call the function `loanRequest` from an account which has been approved to get a loan


## Deployment

The UI of this app his hosted on: https://vercel.com/dacarva/proof-of-fun-frontend

The current URL of the backend: https://octopus-summary-perfectly.ngrok-free.app

## Built With

* [Yarn](https://yarnpkg.com/) - The package manager used

## Authors

* **Your Name** - *Initial work* - [YourName](https://github.com/yourusername)

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
