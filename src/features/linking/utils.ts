import {Linking} from 'react-native';
import {logger} from '../../utils/logger';

export function polyganMumbaiExplorerLink(hash: string) {
  return `https://mumbai.polygonscan.com/tx/${hash}`;
}

export function openLinkInBrowser(url: string): void {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      logger.debug(
        'linking/utils',
        'openLinInBrowser',
        "Don't know how to open URI: ",
        url,
      );
    }
  });
}
