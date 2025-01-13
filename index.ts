import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { SmartWalletABI } from './abi';
////////////////////////////////////////////////////////////////////////////////
//                       change your wallet data                
////////////////////////////////////////////////////////////////////////////////
const checkInfos = [
  {
    chain: baseSepolia,
    address: '0x72E4f148681223F57883d0a3714B11cdD1bce536',
    ownerBytes: [
      '0xeda10326bfac92a8191786bff2a5a39f42ed81571e3edbeb8510b62e723ed23ffb6712a31161f629830c00eac1b309e2b2c3afac5f95c52b4ec638ce9a3a499d',
      '0x6d5a196d1e84913c9f8a95a921760da1a4f1a48e51d5408225b31caa5f0fc778b3f4c15a6e409c6ef939c580139d5cddf57e0135956fb8892efe137e1d0e36c5'
    ],
  },
  {
    chain: baseSepolia,
    address: '0x3B98dbe060d51969389E190c27f7e572E7C64280',
    ownerBytes: [
      '0xeda10326bfac92a8191786bff2a5a39f42ed81571e3edbeb8510b62e723ed23ffb6712a31161f629830c00eac1b309e2b2c3afac5f95c52b4ec638ce9a3a499d',
      '0x6d5a196d1e84913c9f8a95a921760da1a4f1a48e51d5408225b31caa5f0fc778b3f4c15a6e409c6ef939c580139d5cddf57e0135956fb8892efe137e1d0e36c5'
    ],
  }
];
////////////////////////////////////////////////////////////////////////////////
//                       change your wallet data  end             
////////////////////////////////////////////////////////////////////////////////
async function check(checkInfo) {
  const publicClient = createPublicClient({
    chain: checkInfo.chain,
    transport: http(),
  });

  try {
    // Use Promise.all to call the contract function for each ownerBytes element
    const results = await Promise.all(
      checkInfo.ownerBytes.map(async (ownerByte) => {
        return publicClient.readContract({
          address: checkInfo.address as `0x${string}`,
          abi: SmartWalletABI,
          functionName: 'isOwnerBytes',
          args: [ownerByte], // Pass the current ownerByte as an argument
        });
      })
    );

    console.log('chain:', checkInfo.chain.name, '\n')
    console.log('address:', checkInfo.address, '\n')
    console.log('result:', '\n')
    checkInfo.ownerBytes.forEach((ownerByte, index) => {
      console.log(ownerByte, results[index], '\n')
    })
    console.log('------------------------------------------------------------------------------------------------');
  } catch (error) {
    console.error('Error reading contract:', error);
  }
}

for (let index = 0; index < checkInfos.length; index++) {
  const element = checkInfos[index];
  check(element)

}
