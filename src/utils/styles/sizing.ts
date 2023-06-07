interface Props {
  [key: string]: number;
}

// export enum SpacingEnum {
//   none = 'none',
//   spacing1 = 'spacing1',
//   spacing2 = 'spacing2',
//   spacing4 = 'spacing4',
//   spacing8 = 'spacing8',
//   spacing12 = 'spacing12',
//   spacing16 = 'spacing16',
//   spacing24 = 'spacing24',
//   spacing36 = 'spacing36',
//   spacing48 = 'spacing48',
//   spacing60 = 'spacing60',
// }

export type SpacingProps = {
  none: number;
  spacing1: number;
  spacing2: number;
  spacing4: number;
  spacing8: number;
  spacing12: number;
  spacing16: number;
  spacing24: number;
  spacing36: number;
  spacing48: number;
  spacing60: number;
};

export const spacing: SpacingProps = {
  none: 0,
  spacing1: 1,
  spacing2: 2,
  spacing4: 4,
  spacing8: 8,
  spacing12: 12,
  spacing16: 16,
  spacing24: 24,
  spacing36: 36,
  spacing48: 48,
  spacing60: 60,
};

export const iconSizes: Props = {
  icon8: 8,
  icon12: 12,
  icon16: 16,
  icon20: 20,
  icon24: 24,
  icon28: 28,
  icon36: 36,
  icon40: 40,
  icon64: 64,
};

export const borderRad: Props = {
  none: 0,
  rounded4: 4,
  rounded8: 8,
  rounded12: 12,
  rounded16: 16,
  rounded20: 20,
  rounded24: 24,
  rounded32: 32,
  roundedFull: 999999,
};
