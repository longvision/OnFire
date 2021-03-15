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
    setFieldValue,
    editing,
    setFieldTouched,
    autoCompleteType,
    autocorrect,
    setDisabled,
    disabled,
    name,
    ...InputProps
  },
  ref,
) => {
  const [data, setData] = React.useState(array);
  const inputRef = useRef();

  const onSelect = (index) => {
    setFieldValue(name, data[index].title);
  };

  const onChangeText = (query) => {
    // setValue(query);
    setFieldValue(name, query);
    setData(array.filter((item) => filter(item, query)));
  };

  const handlePressIcon = () => {
    if (!disabled) {
      setFieldValue(name, '');
      setData(array);
    }
  };

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} accessoryLeft={StarIcon} />
  );
  const handleBlur = () => {
    setFieldTouched(name);
  };
  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={handlePressIcon}>
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
      accessoryRight={!editing && renderCloseIcon}
      onChangeText={onChangeText}
      autocorrect={autocorrect}
      returnKeyType={returnKeyType}
      disabled={disabled}
      ref={inputRef}
      onSubmitEditing={onSubmitEditing}
      autoCompleteType={autoCompleteType}
      onBlur={handleBlur}
      onSelect={onSelect}
      {...InputProps}>
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default AutoCompleteField = forwardRef(AutoField);
