const BBSEToken = artifacts.require("BBSEToken");
const BBSEBank = artifacts.require("BBSEBank");
const ETHBBSEPriceFeedOracle = artifacts.require("ETHBBSEPriceFeedOracle");

module.exports = async function (deployer) {
  // Deploy BBSEToken
  await deployer.deploy(BBSEToken);
  const bbseToken = await BBSEToken.deployed();

  // Deploy ETHBBSEPriceFeedOracle
  const oracle = await deployer.deploy(ETHBBSEPriceFeedOracle);

  // Deploy BBSEBank with BBSEToken contract's address, a yearly return rate of 10, and oracle address
  await deployer.deploy(BBSEBank, bbseToken.address, 10, oracle.address);
  const bbseBank = await BBSEBank.deployed();

  // Pass the minter role in BBSEToken to BBSEBank
  await bbseToken.passMinterRole(bbseBank.address);
  await bbseBank.deposit({ value: 30, from: "0xF04eAdaE9368d8E98Cd6Dd27c8E7652d660d7E4b" });
  await bbseBank.deposit({ value: 42, from: "0xadC637d488828608aceaE60e3Da2Fa4Fe5219D92" });
  await bbseBank.deposit({ value: 90, from: "0x48965A22647369637B9a2Fc4f858F6cb80804Ed9" });
  await bbseBank.updateYearlyReturnRate(15,"0xadC637d488828608aceaE60e3Da2Fa4Fe5219D92");
  await bbseBank.borrow({ value: 11, from: "0x48965A22647369637B9a2Fc4f858F6cb80804Ed9" });
  await bbseBank.payLoan({ from: "0x48965A22647369637B9a2Fc4f858F6cb80804Ed9", value: 11 });
  await bbseBank.withdraw({ value: 90, from: "0x48965A22647369637B9a2Fc4f858F6cb80804Ed9" });
  await bbseBank.deposit({ value: 37, from: "0x37E194d091Add0FEef6aa76436C0bFfCc54d26C7" });
  await bbseBank.deposit({ value: 81, from: "0x023F78335D201D96cFEC24C6Bfc84DA000312AD3" });
  await bbseBank.deposit({ value: 63, from: "0xC124B2f3245aE6B11511d3572d646B9aA761fD37" });
};
