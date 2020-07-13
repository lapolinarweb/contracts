require('dotenv').config()

const Web3WsProvider = require('web3-providers-ws')
const HDWalletProvider = require('truffle-hdwallet-provider')
const PrivateKeyProvider = require('truffle-privatekey-provider')

const privateKey = process.env.RELAYER_PRIVATE_KEY || process.env.SENDER_PRIVATE_KEY || process.env.PRIVATE_KEY
const infuraId = process.env.INFURA_ID
const rpcUri = process.env.TRUFFLE_RPC_URI || process.env.RPC_URI || process.env.ETH_HTTP_PROVIDER_URI
const etherscanApiKey = process.env.ETHERSCAN_API_KEY

const createPrivKeyProvider = (networkName) => {
  const providerUri = `https://${networkName}.rpc.authereum.com`
  return () => new PrivateKeyProvider(privateKey, providerUri)
}

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: '8545',
      network_id: '*', // eslint-disable-line camelcase
      gas: 5712383,
      gasPrice: 20000000000
    },
    local: {
      network_id: '*', // eslint-disable-line camelcase
      host: 'localhost',
      port: '9545',
      gas: 5712383,
      gasPrice: 20000000000
    },
    mainnet: {
      provider: createPrivKeyProvider('mainnet'),
      network_id: '1', // eslint-disable-line camelcase
      gas: 2000000,
      gasPrice: 50000000000
    },
    ropsten: {
      provider: createPrivKeyProvider('ropsten'),
      network_id: '3', // eslint-disable-line camelcase
      gas: 5712383,
      gasPrice: 20000000000
    },
    rinkeby: {
      provider: createPrivKeyProvider('rinkeby'),
      network_id: '4', // eslint-disable-line camelcase
      gas: 5712383,
      gasPrice: 20000000000
    },
    kovan: {
      provider: createPrivKeyProvider('kovan'),
      network_id: '42', // eslint-disable-line camelcase
      gas: 5712383,
      gasPrice: 20000000000
    },
    goerli: {
      provider: createPrivKeyProvider('goerli'),
      network_id: '5', // eslint-disable-line camelcase
      gas: 5712383,
      gasPrice: 20000000000
    },
  },

  mocha: {
    timeout: 100000
  },

  compilers: {
    solc: {
      version: '0.5.17',
      docker: false,
      optimizer: {
        // We are deliberately disabling the optimizer.
        // https://github.com/gnosis/safe-contracts/pull/167#discussion_r365153500
        enabled: false,
        runs: 200
      },
      // NOTE: This should technically be muirGlacier, but that fork is
      // (a) not supported here and (b) had no changes that would affect
      // this compilation.
      evmVersion: 'istanbul'
    }
  },

  plugins: [
    'truffle-plugin-verify'
  ],

  verify: {
    preamble: "Author: Authereum Labs, Inc."
  },

  api_keys: {
    etherscan: etherscanApiKey
  }
}
