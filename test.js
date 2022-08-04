const { ethers } = require("ethers");
const PaperfiContract = require("./artifacts/contracts/Paperfi.sol/Paperfi.json")

// console.log(ethers.utils.formatUnits(0.001, "ethers"))
let ans = ethers.utils.formatUnits(ethers.utils.formatUnits("123456.0", "gwei"), "wei")
console.log(ans, typeof (ans))

// const func = async () => {
//     const provider = new ethers.providers.JsonRpcProvider(
//         process.env.NEXT_PUBLIC_RPC_URL
//     )
//     const paperContract = new ethers.Contract(
//         "0xB433Cc01B7fDC8F81cE3F94611314Aaa88b8C4C6",
//         PaperfiContract.abi,
//         provider
//     )
//     const purchaseAmount = await paperContract.purchaseAmount()

//     console.log(purchaseAmount)

// }

// func()