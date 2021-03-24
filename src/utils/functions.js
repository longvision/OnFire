export const checkDollarSign = (value) => {
  if (value.charAt(0) === '$') {
    return value.substring(1).replaceAll(',', '');
  }
  if (value.charAt(0) === 'R') {
    return value.substring(2).replaceAll(',', '');
  } else {
    return value.replaceAll(',', '');
  }
};
