import * as React from "react";
import {
  Badge as PaperBadge,
  BadgeProps,
  useTheme,
} from "react-native-paper";

const Badge = (props: BadgeProps) => {
  const { children, ...restOfProps } = props;
  const theme = useTheme();
  if(children) {
    return (
      <PaperBadge theme={theme} {...restOfProps}>{children}</PaperBadge>
    );
  }
  return null;
};

export default Badge;
