import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";

import "@nomiclabs/hardhat-etherscan";
import "@nomicfoundation/hardhat-toolbox";

const mumbai_api: string= process.env.ALCHEMY_API_MUMBAI_KEY_URL!
const account : string = process.env.METAMASK_PRIVATE_KEY!

const config: HardhatUserConfig = {

  networks: {
    mumbai: {
      url: mumbai_api!,
      accounts: [account]
    }
  },
  solidity: {
    version: "0.8.11"
  },
  paths: {
    artifacts: "./temp/src/artifacts",
    cache: "./temp/src/cache"
  },
  typechain: {
    outDir: "./temp/src/types"
  },
  etherscan: {
    apiKey: process.env.ETHER_SCAN_API_KEY!
  }


};

export default config;
