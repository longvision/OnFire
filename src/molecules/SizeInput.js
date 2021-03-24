import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {Input, Icon, Text} from '@ui-kitten/components';
const SizeInputField = (
  {
    placeholder,
    iconName = '',
    disabled,
    value,
    styles,
    name,
    setFieldValue,
    setFieldTouched,
    iconProps,
    mantissa,
  },
  ref,
) => {
  const inputRef = useRef();

  const Icon = (iconProps) => <Icon {...iconProps} name={iconName} />;

  function sizeFormat(num) {
    return `${Number(num)
      .toFixed(mantissa)
      .replace(/(\d)(?=(\d{3})+(?!\d)(\.\d{1,4}))/g, '$1,')}`;
  }

  const handleChangeText = (text) => {
    // const val = Number(text);
    setFieldValue(name, text.replace(/,/g, '.'));
  };

  const handleBlur = () => {
    setFieldValue(name, sizeFormat(value).toString());
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return (
    <Input
      style={styles}
      keyboardType="decimal-pad"
      status="basic"
      disabled={disabled}
      clearButtonMode="always"
      onFocus={() => setFieldValue(name, '')}
      value={value}
      ref={inputRef}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
};

export default SizeInput = forwardRef(SizeInputField);
