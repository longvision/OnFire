import React, {useImperativeHandle, useRef, forwardRef} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Autocomplete, AutocompleteItem, Icon} from '@ui-kitten/components';

const filter = (item, query) =>
  item.title.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props) => <Icon {...props} name="star" />;

const AutoField = (
  {
    placeholder,
    array,
    onSubmitEditing,
    returnKeyType,
    autoCompleteType,
    autocorrect,
    ...InputProps
  },
  ref,
) => {
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(array);
  const inputRef = useRef();
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

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return (
    <Autocomplete
      placeholder={placeholder}
      value={value}
      accessoryRight={renderCloseIcon}
      onChangeText={onChangeText}
      autocorrect={autocorrect}
      returnKeyType={returnKeyType}
      ref={inputRef}
      onSubmitEditing={onSubmitEditing}
      autoCompleteType={autoCompleteType}
      // style={{width: '90%'}}
      onSelect={onSelect}
      {...InputProps}>
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default AutoCompleteField = forwardRef(AutoField);
