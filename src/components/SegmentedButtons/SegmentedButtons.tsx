import * as React from "react";
import {
  SegmentedButtons as PaperSegmentedButtons,
  SegmentedButtonsProps,
  useTheme,
} from "react-native-paper";

const SegmentedButtons = (props: SegmentedButtonsProps) => {
  const theme = useTheme();
  return (
    <PaperSegmentedButtons theme={theme} {...props}/>
  );
};

export default SegmentedButtons;
