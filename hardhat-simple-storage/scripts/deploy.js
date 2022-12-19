// imports
const { ethers, run, network } = require("hardhat")

// async main

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    //whats the private key
    //whats the rpc url
    console.log(`Deployed Contract to: ${simpleStorage.address}`)
    // console.log(network.config)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_APIKEY) {
        console.log("Waiting for block txes...")
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Value is: ${currentValue}`);
    //update current value
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value is: ${updatedValue}`);

}

async function verify(contractAddress, args) {
    console.log("Verifying Contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

// main

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })