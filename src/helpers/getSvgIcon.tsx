import React, { FC, ReactElement } from "react";
import { icons } from "./icons";
import { colors } from "./colors";
import { ReactComponent as Family } from "../assets/img/Work.svg";

interface getSvgIconProps {
  iconId: number;
  colorId: number;
  size: string;
}

export const getSvgIcon: FC<getSvgIconProps> = ({
  iconId,
  colorId,
  size,
}): ReactElement => {
  const { Component } = icons.find(({ id }) => id === iconId) || {
    Component: Family,
  };
  const { colorName } = colors.find(({ id }) => id === colorId) || {
    colorName: "black",
  };

  return <Component color={colorName} height={size} width={size} />;
};
