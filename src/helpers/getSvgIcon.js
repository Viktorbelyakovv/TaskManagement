import React /* , { FC } */ from "react";
import { icons } from "./icons";
import { colors } from "./colors";

/* interface getSvgIconProps {
  iconId: number;
  colorId: number;
  size: string;
} */

export const getSvgIcon /* : FC<getSvgIconProps>  */ = ({
  iconId,
  colorId,
  size,
}) => {
  const { component: Component } = icons.find(({ id }) => id === iconId) || {};
  const { colorName } = colors.find(({ id }) => id === colorId) || {};

  return <Component color={colorName} height={size} width={size} />;
};
