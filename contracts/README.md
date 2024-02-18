# UFi Contract README

## Overview
The UFi smart contract, designed for deployment on the Scroll blockchain, enables the issuance of loans through the Aave lending pool. It leverages zero-knowledge proofs for credit score verification, prioritizing borrower privacy and security.

**Deployed At**: `0x23302a4f559398b68CDb1F5660a2D12032B70342`

## Contract Address and Relevant Information
- **USDC Address**: `0x2C9678042D52B97D27f2bD2947F7111d93F3dD0D`
- **Aave Pool Address**: `0x48914C788295b5db23aF2b5F0B3BE775C4eA9440`
- **USDC Variable Debt Token Address**: `0x6ED2eB0A4141975A8A33558234137265f36055f7`

## Key Features
- **Loan Request**: Enables users to apply for loans by specifying an amount and submitting a zero-knowledge proof of their credit score.
- **Credit Score Verification**: Employs a zero-knowledge proof mechanism to assess applicants' creditworthiness discreetly.
- **Aave Integration**: Facilitates loan funding via Aave's lending pool, harnessing its DeFi ecosystem.

## Functions
- **loanRequest**: A public function for loan applications, requiring a zero-knowledge proof.
- **Events**: 
  - **LoanRequestCreated**: Triggered upon the creation of a loan request.
  - **LoanStatusUpdated**: Triggered when a loan request's status changes.

## How to Use
To utilize the UFi contract:

1. **Deploy the Contract**: Deploy on Scroll, including the Aave lending pool and sponsor addresses during initialization.

2. **Approving Delegation**: Asset suppliers (delegators) must authorize the UFi contract to manage a specified asset amount for loans, particularly on the USDC Variable Debt Token Address, allowing it to procure assets from Aave.

3. **Request a Loan**: Loan applications are made via the `loanRequest` function by providing the loan amount, verifier address, and zero-knowledge proof details for credit evaluation.

## Developer Information
- **Solidity Version**: ^0.8.20
- **SPDX-License-Identifier**: MIT
- **Dependencies**:
  - `@aave/core-v3` for Aave protocol interactions.
  - `@openzeppelin/contracts` for ERC20 standards.

This contract caters to developers aiming to integrate DeFi loans with secure credit score verification into their platforms.
