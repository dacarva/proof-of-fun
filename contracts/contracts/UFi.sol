// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {IPool} from "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IZkCreditVerifier {
    function verifyProof(
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        uint256[4] calldata _pubSignals
    ) external view returns (bool);
}

contract UFi {
    enum Status {NotPaidOff, Approved, Rejected, PaidOff}

    struct Loan {
        address applicant;
        uint256 loanAmount;
        address verifierAddress;
        bytes32 proofHash;
        Status status;
    }

    Loan[] public loans;
    IPool public aaveLendingPool;
    address public sponsorAddress;

    address usdcAddress = address(0x2C9678042D52B97D27f2bD2947F7111d93F3dD0D);
    IERC20 public usdc = IERC20(usdcAddress);

    event LoanRequestCreated(address indexed applicant, uint256 loanAmount);
    event LoanStatusUpdated(uint256 requestIndex, Status status);

    constructor(address _aaveLendingPoolAddress, address _sponsorAddress) {
        aaveLendingPool = IPool(_aaveLendingPoolAddress);
        sponsorAddress = _sponsorAddress;
    }

   function verifyCreditScore(
    address _verifierAddress,
    uint256[2] calldata _pA,
    uint256[2][2] calldata _pB,
    uint256[2] calldata _pC,
    uint256[4] calldata _pubSignals
) internal view returns (bool) {
    return IZkCreditVerifier(_verifierAddress).verifyProof(_pA, _pB, _pC, _pubSignals);
}

    function borrow(uint256 _amount) internal {
        uint256 interestRateMode = 2; 
        uint16 referralCode = 0;
        aaveLendingPool.borrow(usdcAddress, _amount, interestRateMode, referralCode, sponsorAddress);
        usdc.transfer(msg.sender, _amount);
    }

    function loanRequest(
        uint256 _amount,
        address _verifierAddress,
        uint256[2] calldata _pA,
        uint256[2][2] calldata _pB,
        uint256[2] calldata _pC,
        uint256[4] calldata _pubSignals
    ) public {
        bool isCreditworthy = verifyCreditScore(_verifierAddress, _pA, _pB, _pC, _pubSignals);
        if (isCreditworthy) {
          
            bytes32 proofHash = keccak256(abi.encodePacked(_pubSignals));
            loans.push(Loan({
                applicant: msg.sender,
                loanAmount: _amount,
                verifierAddress: _verifierAddress,
                proofHash: proofHash,
                status: Status.Approved 
            }));
            uint256 requestIndex = loans.length - 1;
            emit LoanRequestCreated(msg.sender, _amount);
            emit LoanStatusUpdated(requestIndex, Status.Approved);

            
            borrow(_amount);
        } else {
           
            emit LoanStatusUpdated(loans.length, Status.Rejected);
        }
    }
}
