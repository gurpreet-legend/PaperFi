/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: './.env.local' });

task("accounts", "Print the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }

})
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "sepolia",
  networks: {
    // hardhat: {},
    // ganache: {
    //   url: process.env.NEXT_PUBLIC_RPC_URL,
    //   account: [privateKey]
    // },
    rinkeby: {
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [privateKey]
    },
    goerli: {
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [privateKey],
    },
    polygon: {
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [privateKey],
    },
    sepolia: {
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [privateKey],
    }
  }
};
