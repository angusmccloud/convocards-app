import React, { useMemo } from "react";
import { View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import Text from '../Text/Text';
import useStyles from "./TabStyles";

interface TabProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const Tab = (props: TabProps) => {
  const theme = useTheme();
  const styles = useMemo(() => useStyles(theme), [theme]);
  const { options, selectedOption, setSelectedOption } = props;

  return (
    <View style={styles.tabWrapper}>
      {options.map((item, index) => {
        return (
          <Pressable onPress={() => setSelectedOption(item)} style={[styles.tabItem, {backgroundColor: selectedOption === item ? theme.colors.primary : theme.colors.background}]} key={index}>
            <View>
              <Text color={selectedOption === item ? theme.colors.onPrimary : undefined} bold>
                {item.toUpperCase()}
              </Text>
            </View>
          </Pressable>
        )
      })}
    </View>
  )
};

export default Tab;
