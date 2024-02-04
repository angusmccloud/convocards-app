import * as React from "react";
import {
  Chip as PaperChip,
  ChipProps,
  useTheme,
} from "react-native-paper";

const Chip = (props: ChipProps) => {
  const { children, mode='outlined', ...restOfProps } = props;
  const theme = useTheme();
  if(children) {
    return (
      <PaperChip theme={theme} mode={mode} {...restOfProps}>{children}</PaperChip>
    );
  }
  return null;
};

export default Chip;
