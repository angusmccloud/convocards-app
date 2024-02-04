import { StyleSheet } from 'react-native';
import { useReusableStyles } from '../../styles';

const useStyles = theme => {
  const reusableStyles = useReusableStyles(theme);
  return StyleSheet.create({
    ...reusableStyles,
    tabWrapper: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 2,
      backgroundColor: theme.colors.background,
    },
    tabItem: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
  });
}

export default useStyles;