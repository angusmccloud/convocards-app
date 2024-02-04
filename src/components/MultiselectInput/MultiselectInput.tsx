import React, { useState } from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { MultiSelect, IMultiSelectRef } from 'react-native-element-dropdown';
import Text, { TextSizes } from '../Text/Text';
import useStyles from "./MultiselectInputStyles";

interface MultiselectInputProps extends IMultiSelectRef {
  values: string[];
  setValues: (values: string[]) => void;
  data: any[];
  placeholder?: string;
  focusPlaceholder?: string;
  valueField?: string;
  label?: string;
}

const MultiselectInput = (props: MultiselectInputProps) => {
  const { values, setValues, data, placeholder, focusPlaceholder, valueField, label, ...restOfProps } = props;
  const theme = useTheme();
  const styles = useStyles(theme);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = (label) => {
    if (values?.length > 0 || isFocus) {
      return (
        <View style={styles.dropdownLabelWrapper}>
          <Text style={[isFocus && { color: theme.colors.primary }]} size={TextSizes.XS}>
            {label}
          </Text>
        </View>
      );
    }
    return null;
  };
  return (
    <View style={styles.dropdownWrapper}>
      {renderLabel(placeholder)}
      <MultiSelect
        style={[styles.dropdown, isFocus && { borderColor: theme.colors.primary }]}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.dropdownSelectedText}
        itemTextStyle={styles.dropdownItemText}
        iconStyle={styles.dropdownIcon}
        data={data}
        placeholder={isFocus ? focusPlaceholder : placeholder}
        labelField="label"
        valueField={valueField || "value"}
        value={values}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValues(item);
        }}
        {...restOfProps}
      />
    </View>
  );
};

export default MultiselectInput;
