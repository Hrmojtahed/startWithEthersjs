import {TypograpghiVariant} from '../../utils/styles/typography';

export const getTextSize = (size: number): keyof TypograpghiVariant => {
  if (size >= 70) {
    return 'title1';
  } else if (size >= 45 && size < 70) return 'title2';
  else if (size > 30 && size < 45) return 'title3';
  else return 'title4';
};
