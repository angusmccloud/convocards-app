import { StyleSheet } from 'react-native';
import { useReusableStyles } from '../../styles';

const useStyles = theme => {
  const reusableStyles = useReusableStyles(theme);
  return StyleSheet.create({
    ...reusableStyles,
    fabStyle: {
      bottom: 16,
      right: 16,
      position: 'absolute',
      zIndex: 1001,
    },
  });
}

export default useStyles;