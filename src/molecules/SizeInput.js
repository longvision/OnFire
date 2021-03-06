import React, { useImperativeHandle, useRef, forwardRef } from 'react';
import { Input } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  const Icon = (iconProps) => <Icon {...iconProps} name={iconName} />;

  const handleChangeText = (text) => {
    setFieldValue(name, text);
  };

  const handleBlur = () => {
    const usNotation = /^\d+(\.\d)?\d*$/;

    if (usNotation.test(value)) {
      const usFinal = Number(value).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
      setFieldValue(name, `${usFinal} ${unit}`);
      setFormattedSize(usFinal);
    } else if (value > 1) {
      const cleaned = value.replaceAll('.', '').replaceAll(',', '.');
      const brFinal = Number(cleaned).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });

      setFormattedSize(brFinal);
      setFieldValue(name, `${brFinal} ${unit}`);
    } else {
      const cleaned = value.replaceAll(',', '.');
      const final = Number(cleaned).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });

      setFormattedSize(final);
      setFieldValue(name, `${final} ${unit}`);
    }
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
      onBlur={value && handleBlur}
      placeholder={placeholder}
    />
  );
};

export default SizeInput = forwardRef(SizeInputField);
