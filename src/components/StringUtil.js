import voca from 'voca';

const StringUtil = ({ fn, string }) => {
  return voca[fn](string);
};

export default StringUtil;
