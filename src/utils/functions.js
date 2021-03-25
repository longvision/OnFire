export const checkDollarSign = value => {
  if (value.charAt(0) === '$') {
    return value.substring(1).replace(/,/g, '');
  }
  if (value.charAt(0) === 'R') {
    return value.substring(2).replace(/,/g, '');
  } else {
    return value.replace(/,/g, '');
  }
};
