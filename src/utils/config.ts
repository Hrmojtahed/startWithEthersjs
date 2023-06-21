import {IProviderMetadata} from '@web3modal/react-native';

type providerType = {
  name: string;
  description: string;
  url: string;
  icons: string[];
};

export const providerMetadata = {
  name: 'Simple 1EX',
  description: 'Connect to your wallet.',
  url: 'https://1EX.net',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'w3msample://',
  },
};

export const sessionParams = {
  namespaces: {
    eip155: {
      methods: [
        'eth_sendTransaction',
        'eth_signTransaction',
        'eth_sign',
        'personal_sign',
        'eth_signTypedData',
      ],
      chains: ['eip155:80001'],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
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

// 'eip155:1',
// 'eip155:56',
// 'eip155:137',
// 'eip155:11155111',
// 'eip155:5',
