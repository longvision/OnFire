import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Select,
  SelectItem,
} from '@ui-kitten/components';

// const groupedData = {
//   'UI/UX': ['Frontend Developer', 'Designer'],
//   Management: ['Product Manager', 'Business Analyst'],
// };

const SelectorRaw = (
  {
    data, onSelect, value, selectedIndex, disabled, style, placeholder,
  },
  ref,
) => {
  const inputRef = useRef();

  // const displayValue = data && data[selectedIndex.row];
  const displayValue = value;

  const renderOption = (title) => data && <SelectItem key={title} title={title} />;

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return (
    <Layout style={styles.container} level="1">
      {data && (
        <Select
          style={style}
          placeholder={placeholder}
          value={displayValue}
          disabled={disabled}
          ref={inputRef}
          selectedIndex={selectedIndex}
          onSelect={onSelect}>
          {data.map(renderOption)}
        </Select>
      )}
    </Layout>
  );
};

export default Selector = forwardRef(SelectorRaw);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // height: 192,
  },
  select: {
    flex: 1,
    margin: 2,
  },
});
