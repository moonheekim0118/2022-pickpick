import { COLORS } from "./colors";
import { FONT_SIZE } from "./fontSize";

export const LIGHT_MODE_THEME = {
  COLOR: {
    PRIMARY: { DEFAULT: COLORS.ORANGE[90] },
    SECONDARY: { DEFAULT: COLORS.GREY[80] },
    TEXT: {
      DEFAULT: COLORS.GREY[95],
      DISABLED: COLORS.GREY[60],
      PLACEHOLDER: COLORS.GREY[80],
      LIGHT_BLUE: COLORS.BLUE[50],
      WHITE: COLORS.WHITE,
    },
    BACKGROUND: {
      PRIMARY: COLORS.GREY[30],
      SECONDARY: COLORS.WHITE,
      TERTIARY: COLORS.GREY[50],
    },
    WRAPPER: {
      DEFAULT: COLORS.WHITE,
      DISABLED: COLORS.GREY[40],
    },
    CONTAINER: {
      DEFAULT: COLORS.GREY[20],
      WHITE: COLORS.WHITE,
      LIGHT_RED: COLORS.RED[50],
      LIGHT_BLUE: COLORS.BLUE[50],
      LIGHT_ORANGE: COLORS.ORANGE[50],
      GRADIENT_ORANGE: COLORS.ORANGE.LIGHT_GRADIENT,
    },
    BORDER: COLORS.GREY[50],
    DIMMER: COLORS.GREY[70],
    STAR_ICON_FILL: COLORS.ORANGE[90],
  },
  FONT: {
    PRIMARY: "Roboto",
    SECONDARY: "Twayair",
  },
  FONT_SIZE: {
    TITLE: FONT_SIZE["34px"],
    SUBTITLE: FONT_SIZE["20px"],
    X_LARGE_BODY: FONT_SIZE["18px"],
    LARGE_BODY: FONT_SIZE["14px"],
    BODY: FONT_SIZE["12px"],
    PLACEHOLDER: FONT_SIZE["12px"],
    CAPTION: FONT_SIZE["10px"],
  },
} as const;

export const DARK_MODE_THEME = {
  COLOR: {
    PRIMARY: { DEFAULT: COLORS.ORANGE[90] },
    SECONDARY: { DEFAULT: COLORS.GREY[75] },
    TEXT: {
      DEFAULT: COLORS.WHITE,
      DISABLED: COLORS.GREY[60],
      PLACEHOLDER: COLORS.GREY[80],
      WHITE: COLORS.WHITE,
    },
    BACKGROUND: {
      PRIMARY: COLORS.GREY[100],
      SECONDARY: COLORS.GREY[85],
      TERTIARY: COLORS.GREY[90],
    },
    WRAPPER: {
      DEFAULT: COLORS.GREY[85],
      DISABLED: COLORS.GREY[40],
    },
    CONTAINER: {
      DEFAULT: COLORS.GREY[85],
      WHITE: COLORS.GREY[85],
      LIGHT_RED: COLORS.RED[50],
      LIGHT_BLUE: COLORS.BLUE[50],
      LIGHT_ORANGE: COLORS.ORANGE[50],
      GRADIENT_ORANGE: COLORS.ORANGE.DARK_GRADIENT,
    },
    BORDER: COLORS.GREY[50],
    DIMMER: COLORS.GREY[70],
    STAR_ICON_FILL: COLORS.ORANGE[90],
  },
  FONT: {
    PRIMARY: "Roboto",
    SECONDARY: "Twayair",
  },
  FONT_SIZE: {
    TITLE: FONT_SIZE["34px"],
    SUBTITLE: FONT_SIZE["20px"],
    X_LARGE_BODY: FONT_SIZE["18px"],
    LARGE_BODY: FONT_SIZE["14px"],
    BODY: FONT_SIZE["12px"],
    PLACEHOLDER: FONT_SIZE["12px"],
    CAPTION: FONT_SIZE["10px"],
  },
} as const;
