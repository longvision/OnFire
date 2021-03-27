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

  // const dollarFormat = text => {
  //   const money = MaskService.toMask('money', text, {
  //     unit: '$',
  //     separator: '.',
  //     delimiter: ',',
  //   });
  //   return money;
  // };
  // const realFormat = text => {
  //   const money = MaskService.toMask('money', text, {
  //     unit: 'R$',
  //     separator: ',',
  //     delimiter: '.',
  //   });
  //   return money;
  // };

  const handleChangeText = text => {
    setFieldValue(name, text);
  };
  const handleBlur = () => {
    const usNotation = /^[1-9]\d*(\.\d+)?$/;

    if (usNotation.test(value)) {
      console.log('is US Number Notation: ', usNotation.test(value));
      const final = Number(value).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });

      setFieldValue(name, `${t('$')} ${final}`);
      setFormattedPrice(final);
    } else {
      const cleaned = value.replaceAll('.', '').replaceAll(',', '.');
      const final = Number(cleaned).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
      if (isNaN(final)) {
        setFieldValue(name, '');
      } else {
        setFieldValue(name, `${t('$')} ${final}`);
        setFormattedPrice(final);
      }
    }
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
      onBlur={handleBlur}
      placeholder={t('price_placeholder')}
    />
  );
};

export default PriceInput = forwardRef(PriceInputField);
