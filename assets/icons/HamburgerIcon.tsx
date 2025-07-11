import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

// Extend SvgProps to include a `size` prop
interface Props extends SvgProps {
  size?: number;
}

const HamburgerIcon: React.FC<Props> = ({
  size = 28,
  color = "#000",
  ...rest
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...rest}>
      <Path
        d="M24.5 11.667H8.167M24.5 7h-21M24.5 16.333h-21M24.5 21H8.167"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HamburgerIcon;
