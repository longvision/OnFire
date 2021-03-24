export const checkDollarSign = (value) => {
  if (value.charAt(0) === '$') {
    return value.substring(1).replace(',', '');
  }
  if (value.charAt(0) === 'R') {
    return value.substring(2).replace(',', '');
  } else {
    return value.replace(',', '');
  }
};
