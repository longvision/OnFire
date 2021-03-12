import React, {useImperativeHandle, forwardRef, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {
  IndexPath,
  Layout,
  Select,
  SelectGroup,
  SelectItem,
} from '@ui-kitten/components';

// const groupedData = {
//   'UI/UX': ['Frontend Developer', 'Designer'],
//   Management: ['Product Manager', 'Business Analyst'],
// };

const SelectorRaw = ({data, groupedData, style, placeholder}, ref) => {
  const inputRef = useRef();
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([
    new IndexPath(0, 0),
    new IndexPath(1, 1),
  ]);

  const displayValue = data && data[selectedIndex.row];
  const groupDisplayValues =
    groupedData &&
    multiSelectedIndex.map((index) => {
      const groupTitle = Object.keys(groupedData)[index.section];
      return groupedData[groupTitle][index.row];
    });

  const renderOption = (title) =>
    data && <SelectItem key={title} title={title} />;

  const renderGroup = (title) =>
    groupedData && (
      <SelectGroup title={title} key={title}>
        {groupedData[title].map(renderOption)}
      </SelectGroup>
    );

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
          ref={inputRef}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          {data.map(renderOption)}
        </Select>
      )}
      {groupedData && (
        <Select
          style={style}
          multiSelect={true}
          ref={inputRef}
          placeholder={placeholder}
          value={groupDisplayValues.join(', ')}
          selectedIndex={multiSelectedIndex}
          onSelect={(index) => setMultiSelectedIndex(index)}>
          {Object.keys(groupedData).map(renderGroup)}
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
