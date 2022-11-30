import { ethers } from "ethers";
import {CONTRACT_ADDRESS,abi} from './data.json'
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
let CryptoStakeContract = new ethers.Contract(CONTRACT_ADDRESS,abi,provider);
let CryptoStakeContractSigner = CryptoStakeContract.connect(signer);

export {CryptoStakeContract,CryptoStakeContractSigner,provider}