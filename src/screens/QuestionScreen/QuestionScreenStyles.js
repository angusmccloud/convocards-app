import { StyleSheet } from 'react-native';
import { useReusableStyles } from '../../styles';
import { useDeviceDimensions } from '../../utils';

const useStyles = theme => {
  const reusableStyles = useReusableStyles(theme);
  const { width, height } = useDeviceDimensions();
  return StyleSheet.create({
    ...reusableStyles,
    cardContainer: {
      width: width,
      height: height,
    },
    navigationButtonContainer: {
      position: 'absolute',
      bottom: height * .25,
      width: width,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  });
}

export default useStyles;