import { StyleSheet } from "react-native";
import { useReusableStyles } from "../../styles";

const useStyles = theme => {
  const reusableStyles = useReusableStyles(theme);
  return StyleSheet.create({
    ...reusableStyles,
    inputWrapper: {
      flexDirection: 'row',
      width: '100%',
    },
    valueChangeButton: {
      backgroundColor: theme.colors.primary,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    valueChangeButtonDisabled: {
      backgroundColor: theme.colors.disabled,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    valueWrapper: {
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.primary,
    }
  });
}

export default useStyles;
