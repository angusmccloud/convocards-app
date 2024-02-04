import React, { memo, useMemo } from "react";
import { View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import Text, { TextSizes } from "../Text/Text";
import useStyles from "./NumberInputStyles";

const NumberInput = (props) => {
  const theme = useTheme();
  const styles = useMemo(() => useStyles(theme), [theme]);
  const { value, setValue, min, max, minusPressHandler, plusPressHandler } = props;

  return (
    <View style={styles.inputWrapper}>
      <Pressable style={[value === min ? styles.valueChangeButtonDisabled : styles.valueChangeButton, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}]} onPress={() => minusPressHandler ? minusPressHandler() : setValue(value - 1)} disabled={value === min}>
        <Text color={value === min ? theme.colors.onDisabled : theme.colors.onPrimary} size={TextSizes.XL} bold>
          -
        </Text>
      </Pressable>
      <View style={styles.valueWrapper}>
        <Text size={TextSizes.XL} bold>
          {value}
        </Text>
      </View>
      <Pressable style={[value === max ? styles.valueChangeButtonDisabled : styles.valueChangeButton, {borderTopRightRadius: 10, borderBottomRightRadius: 10}]} onPress={() => plusPressHandler ? plusPressHandler() : setValue(value + 1)} disabled={value === max}>
        <Text color={value === max ? theme.colors.onDisabled : theme.colors.onPrimary} size={TextSizes.XL} bold>
          +
        </Text>
      </Pressable>
    </View>
  );
};

export default memo(NumberInput);
