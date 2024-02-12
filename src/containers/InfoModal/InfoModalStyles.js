import { StyleSheet } from 'react-native';
import { useReusableStyles } from '../../styles';

const useStyles = theme => {
  const reusableStyles = useReusableStyles(theme);
  return StyleSheet.create({
    ...reusableStyles,
  });
}

export default useStyles;