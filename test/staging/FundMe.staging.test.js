const { assert } = require("chai")
const { ethers, getNamedAccounts, network } = require("hardhat")
const {
    isCallTrace
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function() {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("0.1")
          beforeEach(async function() {
              deployer = (await getNamedAccounts).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to submit funds and the owner to withdraw funds", async function() {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert(endingFundMeBalance.toString(), "0")
          })
      })
