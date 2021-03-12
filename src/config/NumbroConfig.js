import numbro from 'numbro';

export const formatNum = (appLocale) => {
  switch (appLocale) {
    case 'br':
      numbro.setLanguage('pt-BR');
      break;
    case 'us':
      numbro.setLanguage('pt-BR');
      break;
    default:
      numbro.setLanguage('en-US');
      break;
  }
};
