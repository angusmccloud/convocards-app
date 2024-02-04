import * as React from "react";

export const DefaultSnackbar = {
  message: '',
  duration: 3000,
  action: undefined,
  onIconPress: undefined
}

export const SnackbarContext = React.createContext({
  DefaultSnackbar
});
