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
    card: {
      position: 'absolute',
      top: height * .1,
      left: width * .05,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.primary,
      borderWidth: 10,
      width: width * .9,
      height: height * .5,
      // shadowColor: theme.colors.tinyShadow,
      // shadowOpacity: 1,
      // shadowRadius: 10,
      borderRadius: 20,
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
      // textAlign: 'center',
      padding: 10,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: height * .25,
      width: width,
      // height: height * .2,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
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