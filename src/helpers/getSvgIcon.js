import React from "react";
import { icons } from "./icons";
import { colors } from "./colors";

export const getSvgIcon = ({ iconId, colorId, size }) => {
  const { component: Component } = icons.find(({ id }) => id === iconId) || {};
  const { colorName } = colors.find(({ id }) => id === colorId) || {};

  return <Component color={colorName} height={size} width={size} />;
};
