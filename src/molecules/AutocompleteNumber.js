import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props) => <Icon {...props} name="star" />;

export const AutocompleteNumber = ({ placeholder, array }) => {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(array);

  const onSelect = (index) => {
    setValue(data[index].title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(array.filter((item) => filter(item, query)));
  };

  const clearInput = () => {
    setValue('');
    setData(array);
  };

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} accessoryLeft={StarIcon} />
  );

  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon {...props} name="close" />
    </TouchableWithoutFeedback>
  );

  return (
    <Autocomplete
      placeholder={placeholder}
      value={value}
      accessoryRight={renderCloseIcon}
      onChangeText={onChangeText}
      style={{ width: '90%' }}
      onSelect={onSelect}>
      {data.map(renderOption)}
    </Autocomplete>
  );
};
