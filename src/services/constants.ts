export const INFURA_ID = '3b94f1e08f27478593ce11977f3dc31d';
export const API_PROVIDER = `https://mainnet.infura.io/v3/${INFURA_ID}`;
export const TEST_ETH_BLOCKCHAIN = `https://sepolia.infura.io/v3/${INFURA_ID}`;

import {SupportedChainId, Token} from '@uniswap/sdk-core';

export const INFURA_API =
  'https://mainnet.infura.io/v3/3b94f1e08f27478593ce11977f3dc31d';

export const ALCHEMY_MUMBAI_API =
  'https://polygon-mumbai.g.alchemy.com/v2/WNykt7Iifw_fsLZDaTXKU8wUs7ZCebgd';

export const ALCHEMY_MAINNAET_API =
  'https://eth-mainnet.g.alchemy.com/v2/QIglR4Ng0fLKE5DThUe3LjBugZFCh1Y9';

export const walletAddress: string[] = [
  '0x643aA0A61eADCC9Cc202D1915D942d35D005400C', //ethers.eth -> 0.182334002436162568 ETH
  '0xd39b3CCf9ECac0c8013eA30700dea9C6C539AE49', // balance -> 0.017405826884855738 ETH
];

export const TokenContracts = {
  goldToken: '0xEACFea2A61538E9D708Efb372c91faE3695C5F2f',
  matic: '0x0000000000000000000000000000000000001010',
};

export const MY_WALLET_ADDRESS = '0x1D307Dcd5A7D67064FA77c85bA66e0CD471C7539';

export const ERC20_ABI = [
  'constructor()',
  'event Approval(address indexed,address indexed,uint256)',
  'event OwnershipTransferred(address indexed,address indexed)',
  'event Transfer(address indexed,address indexed,uint256)',
  'function DOMAIN_SEPARATOR() view returns (bytes32)',
  'function allowance(address,address) view returns (uint256)',
  'function approve(address,uint256) returns (bool)',
  'function balanceOf(address) view returns (uint256)',
  'function burn(uint256)',
  'function burnFrom(address,uint256)',
  'function decimals() view returns (uint8)',
  'function decreaseAllowance(address,uint256) returns (bool)',
  'function increaseAllowance(address,uint256) returns (bool)',
  // 'function mint(uint256)',
  'function name() view returns (string)',
  'function nonces(address) view returns (uint256)',
  'function owner() view returns (address)',
  'function permit(address,address,uint256,uint256,uint8,bytes32,bytes32)',
  'function renounceOwnership()',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function transfer(address,uint256) returns (bool)',
  'function transferFrom(address,address,uint256) returns (bool)',
  'function transferOwnership(address)',
];

export const GOLD = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  TokenContracts.goldToken,
  18,
  'GLD',
  'GoldToken',
);

export const MATIC = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  TokenContracts.matic,
  18,
  'MATIC',
  'MATIC',
);

export const TokenList: Token[] = [MATIC, GOLD];
