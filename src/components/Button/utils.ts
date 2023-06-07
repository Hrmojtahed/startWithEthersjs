import {colors} from '../../utils/styles/color';
import {SpacingProps} from '../../utils/styles/sizing';
import {TypograpghiVariant} from '../../utils/styles/typography';
import {ButtonEmphasis, ButtonSize, ButtonType} from './type';

const getButtonColor = (emphasis: ButtonEmphasis, type: ButtonType): string => {
  if (type == 'outline') return colors.none;
  switch (emphasis) {
    case ButtonEmphasis.Primary:
      return colors.primary;
    case ButtonEmphasis.Success:
      return colors.green;
    case ButtonEmphasis.Error:
      return colors.red;
    case ButtonEmphasis.Warning:
      return colors.yellow;
    default:
      return colors.primary;
  }
};
const getButtonTextColor = (
  emphasis: ButtonEmphasis,
  type: ButtonType,
): string => {
  if (type == 'outline') {
    switch (emphasis) {
      case ButtonEmphasis.Primary:
        return colors.primary;
      case ButtonEmphasis.Success:
        return colors.green;
      case ButtonEmphasis.Error:
        return colors.red;
      case ButtonEmphasis.Warning:
        return colors.yellow;
      default:
        return colors.primary;
    }
  } else {
    return colors.white;
  }
};
const getButtonTextSizeVariant = (
  size: ButtonSize,
): keyof TypograpghiVariant => {
  switch (size) {
    case ButtonSize.Large:
      return 'title2';
    case ButtonSize.Medium:
      return 'title3';
    case ButtonSize.Small:
      return 'title4';
  }
};
const getButtonPaddingX = (size: ButtonSize): keyof SpacingProps => {
  switch (size) {
    case ButtonSize.Large:
      return 'spacing16';
    case ButtonSize.Medium:
      return 'spacing12';
    case ButtonSize.Small:
      return 'spacing8';
  }
};
const getButtonPaddingY = (size: ButtonSize): keyof SpacingProps => {
  switch (size) {
    case ButtonSize.Large:
      return 'spacing16';
    case ButtonSize.Medium:
      return 'spacing12';
    case ButtonSize.Small:
      return 'spacing8';
  }
};
const getButtonBorderColor = (emphasis: ButtonEmphasis): string => {
  switch (emphasis) {
    case ButtonEmphasis.Primary:
      return colors.primary;
    case ButtonEmphasis.Success:
      return colors.green;
    case ButtonEmphasis.Error:
      return colors.red;
    case ButtonEmphasis.Warning:
      return colors.yellow;
  }
};
const getButtonBorderRadius = (size: ButtonSize): string => {
  switch (size) {
    case ButtonSize.Large:
      return 'rounded16';
    case ButtonSize.Medium:
      return 'rounded12';
    case ButtonSize.Small:
      return 'rounded8';
  }
};
const getButtonIconPadding = (size: ButtonSize): keyof SpacingProps => {
  switch (size) {
    case ButtonSize.Large:
      return 'spacing16';
    case ButtonSize.Medium:
      return 'spacing12';
    case ButtonSize.Small:
      return 'spacing8';
  }
};

export const getButtonProperties = (
  size: ButtonSize,
  type: ButtonType,
  emphasis: ButtonEmphasis,
) => {
  const backgroundColor = getButtonColor(emphasis, type);
  const textColor = getButtonTextColor(emphasis, type);
  const textVariant = getButtonTextSizeVariant(size);
  const paddingX = getButtonPaddingX(size);
  const paddingY = getButtonPaddingY(size);
  const borderColor = getButtonBorderColor(emphasis);
  const borderRadius = getButtonBorderRadius(size);
  const iconPadding = getButtonIconPadding(size);

  return {
    backgroundColor,
    textColor,
    textVariant,
    paddingX,
    paddingY,
    borderRadius,
    borderColor,
    iconPadding,
  };
};
