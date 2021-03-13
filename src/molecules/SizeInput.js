import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {Input, Icon, Text} from '@ui-kitten/components';
const SizeInputField = (
  {
    placeholder,
    iconName = '',
    value,
    styles,
    name,
    setFieldValue,
    setFieldTouched,
    iconProps,
  },
  ref,
) => {
  const inputRef = useRef();

  const Icon = (iconProps) => <Icon {...iconProps} name={iconName} />;

  function sizeFormat(num) {
    return `${Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d)(\.\d{1,4}))/g, '$1,')}`;
  }

  const handleChangeText = (text) => {
    // const val = Number(text);
    setFieldValue(name, text);
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
      keyboardType="numeric"
      status="basic"
      clearButtonMode="always"
      value={value}
      ref={inputRef}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
};

export default SizeInput = forwardRef(SizeInputField);
