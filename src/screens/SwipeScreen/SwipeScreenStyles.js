import { StyleSheet } from 'react-native';
import { useReusableStyles } from '../../styles';

const useStyles = theme => {
  const reusableStyles = useReusableStyles(theme);
  return StyleSheet.create({
    ...reusableStyles,
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    header: {
      color: '#000',
      fontSize: 30,
      marginBottom: 30,
    },
    cardContainer: {
      width: '90%',
      maxWidth: 260,
      height: 300,
    },
    card: {
      position: 'absolute',
      backgroundColor: 'gray',
      width: '100%',
      maxWidth: 260,
      height: 300,
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowRadius: 20,
      borderRadius: 20,
      resizeMode: 'cover',
    },
    cardImage: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 20,
    },
    cardTitle: {
      position: 'absolute',
      bottom: 0,
      margin: 10,
      color: '#fff',
    },
    infoText: {
      height: 28,
      justifyContent: 'center',
      display: 'flex',
      zIndex: -100,
    }
  });
}

export default useStyles;