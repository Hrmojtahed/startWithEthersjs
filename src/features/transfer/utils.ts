import {Token} from '@uniswap/sdk-core';
import {getProvider} from '../../libs/provider';
import {Contract, ethers} from 'ethers';
import {ERC20_ABI} from '../../services/constants';
import {logger} from '../../utils/logger';

const provider = getProvider();

export async function tokenHasMintFunction(token: Token): Promise<boolean> {
  // Retrieve the bytecode of the token contract
  const tokenContract = new ethers.Contract(token.address, ERC20_ABI, provider);

  try {
    // Call the "mint" function on the token contract
    const res = await tokenContract.mint(0); // Provide any required arguments for the function call

    // If the call succeeds, the "mint" function is implemented in the contract
    console.log('Token contract has mint function');

    logger.debug(
      'transfer/utils',
      'tokenHasMintFunction\n',
      `${token.name} is mintable `,
    );

    return true;
  } catch (error) {
    // If an error occurs, the "mint" function is not implemented in the contract
    console.log('Token contract does not have mint function', error);
    return false;
  }
}
