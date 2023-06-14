import * as Clipboard from 'expo-clipboard';
import {logger} from './logger';

export async function getClipboard(): Promise<string | void> {
  try {
    const value = await Clipboard.getStringAsync();
    return value;
  } catch (error) {
    logger.error(
      'clipboard',
      'getClipboard',
      'Unable to get clipboard string',
      error,
    );
  }
}

export function setClipboard(value: string): void {
  try {
    logger.debug('clipboard', 'setClipboard', 'value', value);
    Clipboard.setStringAsync(value);
  } catch (error) {
    logger.error(
      'clipboard',
      'setClipboard',
      'Unable to set clipboard string',
      error,
    );
  }
}
