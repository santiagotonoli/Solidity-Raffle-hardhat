const {developmentChains} = require("../helper-hardhat-config");
const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. it cost that to use oracle
const GAS_PRICE_LINK = 1e9 //link per gas. calculated value base on the gas price of the chain

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if(developmentChains.includes(network.name)){
        log("Local network detected! Deploying mocks...")
        // deploy a mock vrfcoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: args,
            log: true
            });
            log("Mocks deployed!")
            log("-----------------------------------------------------")
            
    }
}
module.exports.tags = ["all", "raffle"]