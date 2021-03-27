import React, {useImperativeHandle, useRef, forwardRef, useEffect} from 'react';
import {Input, Icon, Text} from '@ui-kitten/components';
import {useTranslation} from 'react-i18next';
import {MaskService} from 'react-native-masked-text';
const SizeInputField = (
  {
    placeholder,
    iconName = '',
    disabled,
    value,
    styles,
    name,
    setFieldValue,
    onSubmitEditing,
    setFieldTouched,
    iconProps,
    setFormattedSize,
    mantissa,
    unit,
  },
  ref,
) => {
  const inputRef = useRef();
  const {t, i18n} = useTranslation();
  const Icon = iconProps => <Icon {...iconProps} name={iconName} />;

  function usFormat(text) {
    const quantity = MaskService.toMask('money', text, {
      unit: '',
      separator: '.',
      delimiter: ',',
      suffixUnit: unit,
    });
    return quantity;
  }

  function brFormat(text) {
    const quantity = MaskService.toMask('money', text, {
      unit: '',
      separator: ',',
      delimiter: '.',
      suffixUnit: unit,
    });
    return quantity;
  }

  const handleChangeText = text => {
    setFieldValue(name, text);
  };

  const handleBlur = () => {
    if (i18n.language === 'en') {
      setFieldValue(name, usFormat(value));
    }
    if (i18n.language === 'pt') {
      setFieldValue(name, brFormat(value));
    }
    // const array = value.toString().splice(-2);
    const serverFormat = [value.slice(0, -2), '.', value.slice(-2)].join('');
    console.log(Number(serverFormat).toFixed(4));
    setFormattedSize(Number(serverFormat).toFixed(4));
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
