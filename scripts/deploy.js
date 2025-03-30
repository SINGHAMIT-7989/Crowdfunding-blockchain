const hre = require("hardhat");

async function main() {
    const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");
    const campaignFactory = await CampaignFactory.deploy();

    await campaignFactory.waitForDeployment(); // ✅ Use this instead of deployed()

    console.log("Factory deployed to:", await campaignFactory.getAddress()); // ✅ Use getAddress()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
