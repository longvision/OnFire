import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {Input, Icon, Text} from '@ui-kitten/components';
const PriceInputField = (
  {placeholder, iconName = '', style, iconProps},
  ref,
) => {
  const inputRef = useRef();
  const [price, setPrice] = React.useState('');
  const Icon = (iconProps) => <Icon {...iconProps} name={iconName} />;

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const handleChangeText = (text) => {
    let val = Number(text);
    setPrice(val);
    console.log(price);
  };

  const handleBlur = () => {
    price[0] !== '$' && setPrice(currencyFormat(price).toString());
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
      status="basic"
      clearButtonMode="always"
      value={price}
      ref={inputRef}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
};

export default PriceInput = forwardRef(PriceInputField);
