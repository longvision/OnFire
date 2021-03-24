import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {Input, Icon, Text} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
const PriceInputField = (
  {
    placeholder,
    iconName = '',
    style,
    setFieldValue,
    name,
    setFieldTouched,
    disabled,
    value,
    mantissa,
    iconProps,
  },
  ref,
) => {
  const inputRef = useRef();
  const {t, i18n} = useTranslation();
  const Icon = (iconProps) => <Icon {...iconProps} name={iconName} />;

  function currencyFormat(num) {
    return (
      `${t('$')}` +
      Number(num)
        .toFixed(mantissa)
        .replace(/(\d)(?=(\d{3})+(?!\d)(\.\d{1,4}))/g, '$1,')
    );
  }

  const handleChangeText = (text) => {
    setFieldValue(name, text);
  };

  const handleBlur = () => {
    if (value[0] !== '$' || value[0] !== 'R') {
      setFieldValue(name, currencyFormat(value).toString());
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
      clearButtonMode="always"
      ref={inputRef}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
};

export default PriceInput = forwardRef(PriceInputField);
