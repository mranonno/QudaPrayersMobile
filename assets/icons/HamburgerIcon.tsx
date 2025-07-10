import React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const HamburgerIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      {...props} // allows custom props like color, style, etc.
    >
      <Path
        d="M24.5 11.667H8.167M24.5 7h-21M24.5 16.333h-21M24.5 21H8.167"
        stroke={props.color || "#000"} // fallback color
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default HamburgerIcon;
