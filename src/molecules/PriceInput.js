import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {Input, Icon, Text} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import {MaskService} from 'react-native-masked-text';
const PriceInputField = (
  {
    placeholder,
    iconName = '',
    style,
    setFieldValue,
    name,
    setFieldTouched,
    disabled,
    setFormattedPrice,
    value,
    mantissa,
    iconProps,
  },
  ref,
) => {
  const inputRef = useRef();
  const {t, i18n} = useTranslation();
  const Icon = iconProps => <Icon {...iconProps} name={iconName} />;

  // function dollarFormat(num) {
  //   //format a number to 4 decimal points using dot notation.
  //   // .replace(/(\d)(?=(\d{3})+(?!\d)(\.\d{1,4}))/g, '$1,')
  //   return (
  //     `$` +
  //     Number(num).toLocaleString('en-US', {
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: 4,
  //     })
  //   );
  // }
  // function realFormat(num) {
  //   const formatOriginalInput = text => {
  //     console.log(text);
  //     const clean = text.toString().replaceAll('.', '').replaceAll(',', '.');
  //     return Number(clean).toLocaleString('pt-BR', {
  //       minimumFractionDigits: 2,
  //       maximumFractionDigits: 4,
  //     });
  //   };
  //   //Check if number is brazilian notation
  //   const dollarRegex = /(\d)(?=(\d{3})+(?!\d)(\.\d{1,4}))/;
  //   console.log(dollarRegex.test(num));
  //   if (!dollarRegex.test(num)) {
  //     return (
  //       `R$` +
  //       Number(formatOriginalInput(num)).toLocaleString('pt-BR', {
  //         minimumFractionDigits: 2,
  //         maximumFractionDigits: 4,
  //       })
  //     );
  //   } else {
  //     //format a number to 4 decimal points using comma notation.
  //     return (
  //       `R$` +
  //       Number(num).toLocaleString('pt-BR', {
  //         minimumFractionDigits: 2,
  //         maximumFractionDigits: 4,
  //       })
  //     );
  //   }
  // }

  const dollarFormat = text => {
    const money = MaskService.toMask('money', text, {
      unit: '$',
      separator: '.',
      delimiter: ',',
    });
    return money;
  };
  const realFormat = text => {
    const money = MaskService.toMask('money', text, {
      unit: 'R$',
      separator: ',',
      delimiter: '.',
    });
    return money;
  };

  const handleChangeText = text => {
    setFieldValue(name, text);
  };

  const handleBlur = () => {
    if (i18n.language === 'en') {
      setFieldValue(name, dollarFormat(value));
    }
    if (i18n.language === 'pt') {
      setFieldValue(name, realFormat(value));
    }
    const serverFormat = [value.slice(0, -2), '.', value.slice(-2)].join('');
    setFormattedPrice(Number(serverFormat).toFixed(4));
  };
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return (
    <Input
      style={style}
      keyboardType="decimal-pad"
      onFocus={() => setFieldValue(name, '')}
      disabled={disabled}
      status="basic"
      value={value}
      keyboardType="default"
      autoCapitalize="none"
      clearButtonMode="always"
      ref={inputRef}
      onChangeText={handleChangeText}
      onChange={() => {
        if (i18n.language === 'en') {
          setFieldValue(name, dollarFormat(value));
        }
        if (i18n.language === 'pt') {
          setFieldValue(name, realFormat(value));
        }
      }}
      onBlur={handleBlur}
      placeholder={t('price_placeholder')}
    />
  );
};

export default PriceInput = forwardRef(PriceInputField);
