export enum WalletImportEnum {
  Seed = 'Seed',
  PrivateKey = 'PrivateKey',
  Other = 'Other',
}

export function checkSeedPhraseOrPrivateKey(inputText: string): string {
  // Check if the input matches the seed phrase pattern

  const seedPhrasePattern = /^(\b[a-z]+\b\s){11}(\b[a-z]+\b)$/i;
  if (seedPhrasePattern.test(inputText)) {
    return WalletImportEnum.Seed;
  }

  // Check if the input matches the private key pattern
  const privateKeyPattern = /^(0x)?[0-9a-fA-F]{64}$/;
  if (privateKeyPattern.test(inputText)) {
    return WalletImportEnum.PrivateKey;
  }

  // If the input doesn't match either pattern, it is neither a seed phrase nor a private key
  return WalletImportEnum.Other;
}
