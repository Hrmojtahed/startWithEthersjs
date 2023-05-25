type providerType = {
  name: string;
  description: string;
  url: string;
  icons: string[];
};

export const WalletConnectMetadata: providerType = {
  name: '1EX.net ',
  description: 'React native test for wallet connection',
  url: 'https://walletconnect.com/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const WALLETCONNECT_PROJECT_ID = '8bc9db449b6b6c5e4cfd264e4248d27a';

export const ALCHEMY_API =
  'https://polygon-mumbai.g.alchemy.com/v2/WNykt7Iifw_fsLZDaTXKU8wUs7ZCebgd';

export const MAINNET_API =
  'https://mainnet.infura.io/v3/3b94f1e08f27478593ce11977f3dc31d';

export const GOLD_TOKEN_CONTRACT = '0xEACFea2A61538E9D708Efb372c91faE3695C5F2f';

export const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint)',
  'function decimals() view returns (uint8)',
];
