import {Linking, Platform} from 'react-native';
import {logger} from '../../utils/logger';

export function polyganMumbaiExplorerLink(hash: string) {
  return `https://mumbai.polygonscan.com/tx/${hash}`;
}

export async function openLinkInBrowser(url: string): Promise<void> {
  const supported = await Linking.canOpenURL(url);
  console.log('supported', supported);
  if (!supported && Platform.OS != 'android') {
    logger.warn('linking', 'openUri', `Cannot open URI: ${url}`);
    return;
  }
  try {
    await Linking.openURL(url);
  } catch (error) {
    logger.error('linking', 'openUri', `${error}`);
  }
}
