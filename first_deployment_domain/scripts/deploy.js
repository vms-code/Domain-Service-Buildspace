const main = async () => {
    const domainContracFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContracFactory.deploy("io");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);


    let txn = await domainContract.register("vms_code", {value: hre.ethers.utils.parseEther('0.01')});
    await txn.wait();
    console.log("Minted domain vms_code.io");


    txn = await domainContract.setRecord("vms_code", "Hello World");
    await txn.wait();
    console.log("Set record for vms_code.io");

    const address = await domainContract.getAddress("vms_code");
    console.log("Owner of domain vms_code:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async() => {

    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();
