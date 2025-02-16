import { StyleSheet } from 'react-native';
import { useReusableStyles } from '../../styles';
import { useDeviceDimensions } from '../../utils';

const useStyles = theme => {
  const reusableStyles = useReusableStyles(theme);
  const { width, height } = useDeviceDimensions();
  return StyleSheet.create({
    ...reusableStyles,
    card: {
      position: 'absolute',
      top: height * .1,
      left: width * .05,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.primary,
      borderWidth: 10,
      width: width * .9,
      height: height * .5,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    cardButtonContainer: {
      position: 'absolute',
      width: '100%',
      bottom: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
}

export default useStyles;
