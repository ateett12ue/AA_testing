const ethers = require('ethers');
const { Client, Presets } = require('userop');


async function sysCall (){
    const privateKey = ethers.Wallet.createRandom().privateKey;
const owner = new ethers.Wallet(privateKey);
const bundlerRpcUrl = 'https://rpc.kriptonio.com/v1/endpoints/polygon/mumbai/tWMAUhjyV3gqBjCNtAAv686Z'
console.log(privateKey, owner);

const entryPointAddress = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
const factoryAddress = '0x9406Cc6185a346906296840746125a0E44976454';

const smartAccount = await Presets.Builder.SimpleAccount.init(
  owner,
  bundlerRpcUrl,
  entryPointAddress,
  factoryAddress,
);

console.log('smart wallet address', smartAccount.getSender());

const client = await Client.init(bundlerRpcUrl, entryPointAddress);
const result = await client.sendUserOperation(
  smartAccount.execute(smartAccount.getSender(), 0, "0x"),
);
const event = await result.wait();
console.log(`Transaction hash: ${event?.transactionHash}`);
}


sysCall()