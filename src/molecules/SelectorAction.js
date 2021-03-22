import React, {useImperativeHandle, forwardRef, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
  Icon,
  IndexPath,
  Layout,
  Select,
  SelectGroup,
  SelectItem,
} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/core';

// const groupedData = {
//   'UI/UX': ['Frontend Developer', 'Designer'],
//   Management: ['Product Manager', 'Business Analyst'],
// };

const SelectorRawAction = (
  {
    data,
    onSelect,
    value,
    selectedIndex,
    disabled,
    style,
    placeholder,
    actionTitle,
    icon,
    navigateTo,
    handlePressItem,
  },
  ref,
) => {
  const inputRef = useRef();
  const navigation = useNavigation();
  // const displayValue = data && data[selectedIndex.row];
  const displayValue = value;

  const renderOption = (item) => (
    <SelectItem
      key={item}
      title={item}
      onPress={() => {
        handlePressItem(item);
        inputRef.current.blur();
      }}
    />
  );

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  const handlePressAction = () => {
    navigation.navigate(navigateTo);
    inputRef.current.hide();
  };

  return (
    <Layout style={styles.container} level="3">
      {data && (
        <Select
          style={style}
          placeholder={placeholder}
          value={displayValue}
          disabled={disabled}
          ref={inputRef}
          selectedIndex={selectedIndex}
          onSelect={onSelect}>
          <SelectItem
            key="AddNewMeasure"
            title={actionTitle}
            accessoryLeft={icon}
            onPress={handlePressAction}
            // accessoryRight={}
          />
          {data && data.map(renderOption)}
        </Select>
      )}
    </Layout>
  );
};

export default SelectorAction = forwardRef(SelectorRawAction);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  select: {
    flex: 1,
    margin: 2,
    height: 300,
  },
});
