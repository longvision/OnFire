import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {Input, Icon, Text} from '@ui-kitten/components';
const SizeInputField = (
  {placeholder, iconName = '', styles, iconProps},
  ref,
) => {
  const inputRef = useRef();
  const [size, setSize] = React.useState('');
  const Icon = (iconProps) => <Icon {...iconProps} name={iconName} />;

  function sizeFormat(num) {
    return `${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g)}`;
  }

  const handleChangeText = (text) => {
    let val = Number(text);
    setSize(val);
    console.log(size);
  };

  const handleBlur = () => {
    setSize(sizeFormat(size).toString());
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
      value={size}
      ref={inputRef}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
};

export default SizeInput = forwardRef(SizeInputField);
