import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {Input, Icon, Text} from '@ui-kitten/components';
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

  const Icon = (iconProps) => <Icon {...iconProps} name={iconName} />;

  function currencyFormat(num) {
    return (
      '$' +
      Number(num)
        .toFixed(mantissa)
        .replace(/(\d)(?=(\d{3})+(?!\d)(\.\d{1,4}))/g, '$1,')
    );
  }

  const handleChangeText = (text) => {
    setFieldValue(name, text);
  };

  const handleBlur = () => {
    value[0] !== '$' && setFieldValue(name, currencyFormat(value).toString());
  };
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return (
    <Input
      style={style}
      keyboardType="numeric"
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
