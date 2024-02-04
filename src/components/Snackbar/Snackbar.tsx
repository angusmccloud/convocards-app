import * as React from "react";
import {
  Snackbar as PaperSnackbar,
  SnackbarProps,
  useTheme,
} from "react-native-paper";

const Snackbar = (props: SnackbarProps) => {
  const theme = useTheme();
  return <PaperSnackbar theme={theme} {...props} />;
};

export default Snackbar;
