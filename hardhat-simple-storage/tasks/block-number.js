const { task } = require("hardhat/config")

task("block-number", "Prints the current block numner").setAction(
    // const blockTask = async function() => {}
    // async function blockTask() {}
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current Block Number; ${blockNumber}`);

    }        
)

module.exports = {}
