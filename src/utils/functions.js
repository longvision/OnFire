export const checkDollarSign = (value) =>
  value.charAt(0) === '$'
    ? value.substring(1).replace(',', '')
    : value.replace(',', '');
