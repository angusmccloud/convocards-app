import React, {useMemo} from 'react';
import { AnimatedFAB as PaperAnimatedFAB, AnimatedFABProps, useTheme } from 'react-native-paper';
import useStyles from "./AnimatedFABStyles";

const AnimatedFAB = (props: AnimatedFABProps) => {
  const theme = useTheme();
  const styles = useMemo(() => useStyles(theme), [theme]);

  const {animateFrom = 'right', iconMode = 'dynamic', ...restOfProps} = props;

  return (
    <PaperAnimatedFAB theme={theme} animateFrom={animateFrom} iconMode={iconMode} {...restOfProps} style={styles.fabStyle} />
  )
};

export default AnimatedFAB;