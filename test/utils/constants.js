const path = require('path')
const authereumProxyAbi = require(path.resolve(__dirname, '../../build/contracts/AuthereumProxy.json'))

module.exports = {
  /**
   * ETH Values
   */

  ONE_ETHER: web3.utils.toWei('1', 'ether'),
  TWO_ETHER: web3.utils.toWei('2', 'ether'),
  THREE_ETHER: web3.utils.toWei('3', 'ether'),
  FOUR_ETHER: web3.utils.toWei('4', 'ether'),
  TEN_ETHER: web3.utils.toWei('10', 'ether'),
  TWENTY_ETHER: web3.utils.toWei('20', 'ether'),
  STARTING_ETHER: web3.utils.toWei('1000000000000000000', 'ether'),

  /**
   * Contract Data
   */

  AUTHEREUM_CONTRACT_VERSIONS: [
    '2019102500',
    '2019111500',
    '2019122000',
    '2019122100',
    '2020010900',
    '2020020200',
    '2020021700'
  ],
  AUTHEREUM_PROXY_CREATION_CODE: authereumProxyAbi.bytecode,
  AUTHEREUM_PROXY_CREATION_CODE_HASH: web3.utils.soliditySha3(authereumProxyAbi.bytecode),
  // This is generated by placing an event in the contract that reads the `extcodesize`
  AUTHEREUM_PROXY_RUNTIME_CODE_HASH: {
    '1571517085': web3.utils.soliditySha3(authereumProxyAbi.deployedBytecode)
  },
  SALT: 123,
  DEFAULT_LABEL: 'myName',

  /**
   * Tx Data
   */

  GAS_PRICE: 20000000000,
  GAS_LIMIT: 500000,
  GAS_LIMIT_GANACHE_BUG: 2300,
  CHAIN_ID: 1,
  DATA: '0x00',
  DEFAULT_GAS_OVERHEAD: 50000,
  DEFAULT_LOGIN_KEY_RESTRICTIONS_DATA: web3.eth.abi.encodeParameter('uint256', 9999999999),

  /**
   * Signing Data
   */

  AUTH_KEY_0_PRIV_KEY: '0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1',
  LOGIN_KEY_0_PRIV_KEY: '0x77c5495fbb039eed474fc940f29955ed0531693cc9212911efd35dff0373153f',

  /**
   * Tokens
   */

  DEFAULT_TOKEN_SUPPLY: 10,
  DEFAULT_TOKEN_SYMBOL: 'AUTH',
  DEFAULT_TOKEN_NAME: 'AuthereumToken',
  DEFAULT_TOKEN_DECIMALS: 18,
  DEFAULT_TOKEN_RATE: 150,

  /**
   * Timing
   */

  ONE_DAY: 86400,
  ONE_WEEK: 86400 * 7,
  ONE_MONTH: 86400 * 7 * 4,

  /**
   * Revert Messages
   */

   REVERT_MSG: {
    // Account
    BA_AUTH_KEY_ALREADY_ADDED: 'BA: Auth key already added',
    BA_AUTH_KEY_NOT_YET_ADDED: 'BA: Auth key not yet added',
    BA_CANNOT_REMOVE_LAST_AUTH_KEY: 'BA: Cannot remove last auth key',
    BA_BLOCKED_BY_FIREWALL: 'BA: Transaction blocked by the firewall',
    BA_INSUFFICIENT_GAS_ETH: 'BA: Insufficient gas (ETH) for refund',
    BA_INSUFFICIENT_GAS_TOKEN: 'BA: Insufficient gas (token) for refund',
    // NOTE: This message is used when an internal, atomic transaction call fails silently
    BA_SILENT_REVERT: 'BA: Transaction reverted silently',
    BA_REQUIRE_SELF: 'BA: Only self allowed',
    BA_REQUIRE_AUTH_KEY_OR_SELF: 'BA: Auth key or self is invalid',

    AI_IMPROPER_INIT_ORDER: 'AI: Improper initialization order',

    LKMTA_LOGIN_KEY_NOT_ABLE_TO_CALL_SELF: 'LKMTA: Login key is not able to call self',
    LKMTA_AUTH_KEY_INVALID: 'LKMTA: Auth key is invalid',
    LKMTA_LOGIN_KEY_EXPIRED: 'LKMTA: Login key is expired',

    AKMTA_AUTH_KEY_INVALID: 'AKMTA: Auth key is invalid',

    BMTA_NOT_LARGE_ENOUGH_TX_GASPRICE: 'BMTA: Not a large enough tx.gasprice',

    AU_NON_CONTRACT_ADDRESS: 'AU: Cannot set a proxy implementation to a non-contract address',

    ERC1271_INVALID_SIG: 'ERC1271: Invalid isValidSignature _signature length',
    ERC1271_INVALID_AUTH_KEY_SIG: 'ERC1271: Invalid isValidAuthKeySignature _signature length',
    ERC1271_INVALID_LOGIN_KEY_SIG: 'ERC1271: Invalid isValidLoginKeySignature _signature length',

    // Admin
    T_REQUIRE_TIMELOCK_CONTRACT: 'T: Only this contract can call this function',
    T_TIMELOCK_NOT_ABLE_TO_CHANGE: 'T: Change not able to be made',
    T_TIMELOCK_NOT_ABLE_TO_INITIATE_CHANGE: 'T: Change not able to be initiated',

    // Base
    O_MUST_BE_OWNER: 'O: Must be owner',
    O_NOT_NULL_ADDRESS: 'O: Address must not be null',
    M_NOT_NULL_ADDRESS: 'M: Address must not be null',
    M_MUST_BE_EXISTING_MANAGER: 'M: Target must be an existing manager',
    M_MUST_BE_MANAGER: 'M: Must be manager',

    // ENS
    AEM_MUST_SEND_FROM_FACTORY: 'AEM: Must be sent from the authereumFactoryAddress',
    AEM_ADDRESS_MUST_NOT_BE_NULL: 'AEM: Address must not be null',
    AEM_LABEL_OWNED: 'AEM: Label is already owned',

    // Test
    BT_WILL_FAIL: 'BT: Will fail',

    // Upgradeability
    APF_EMPTY_INIT: 'APF: Empty initialization data',
    APF_UNSUCCESSFUL_INIT: 'APF: Unsuccessful account initialization',

    // General
    // NOTE: This message is used when an auth key transaction (not relayed) fails silently
    GENERAL_REVERT: 'revert'
  },

  /**
   * Other
   */

  ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
  HASH_ZERO: '0x0000000000000000000000000000000000000000000000000000000000000000',
  BAD_DATA: '0xe855bd76',
  // This is the hash of Event('Will fail')
  FAILED_TX_DATA: '0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000957696c6c206661696c0000000000000000000000000000000000000000000000',
  FEE_VARIANCE: 9000000000000000
};
