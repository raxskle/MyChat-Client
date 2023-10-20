import pinyin from 'pinyin';

export const getCode = (name: string) => {
  return pinyin(name, {
    style: 'normal',
    mode: 'surname',
  })[0][0][0];
};
