// const hre = require("hardhat")
// require("@nomicfoundation/hardhat-toolbox")

async function main() {
    const [deployer] = await ethers.getSigners();
    // console.log({ ethers })
    // console.log({ deployer })
    // console.log("HERE!!!")

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const PaperfiFactoryContract = await ethers.getContractFactory("PaperfiFactory");
    const paperfiFactory = await PaperfiFactoryContract.deploy();

    console.log(`Deploying PaperfiFactory Contract ....`);
    await paperfiFactory.deployed({value: hre.ethers.utils.parseEther("0.07")});
    console.log("PaperfiFactory address:", paperfiFactory.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });