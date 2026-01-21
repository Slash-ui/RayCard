// CSS color validation regex patterns
const HEX_COLOR_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
const RGB_REGEX = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+))?\s*\)$/;
const HSL_REGEX = /^hsla?\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*(,\s*(0|1|0?\.\d+))?\s*\)$/;
const NAMED_COLORS = new Set([
  "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black",
  "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse",
  "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan",
  "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen",
  "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue",
  "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue",
  "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia",
  "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey",
  "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush",
  "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow",
  "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen",
  "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime",
  "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid",
  "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise",
  "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy",
  "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen",
  "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue",
  "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown",
  "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey",
  "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "transparent", "turquoise",
  "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen",
]);

/**
 * Validates if a string is a valid CSS color value.
 * Supports hex colors (3, 4, 6, or 8 characters), rgb/rgba, hsl/hsla, and named colors.
 */
export function isValidCssColor(color: string): boolean {
  const trimmed = color.trim();
  const lowered = trimmed.toLowerCase();
  return (
    HEX_COLOR_REGEX.test(trimmed) ||
    RGB_REGEX.test(lowered) ||
    HSL_REGEX.test(lowered) ||
    NAMED_COLORS.has(lowered)
  );
}

// CSS border-radius validation - allows px, em, rem, %, or plain numbers
const BORDER_RADIUS_REGEX = /^(\d+(\.\d+)?(px|em|rem|%)?(\s+\d+(\.\d+)?(px|em|rem|%)?){0,3})$/;

/**
 * Validates if a string is a valid CSS border-radius value.
 * Supports numeric values with px, em, rem, or % units.
 */
export function isValidBorderRadius(value: string): boolean {
  return BORDER_RADIUS_REGEX.test(value.trim());
}

/**
 * Clamps a number to a specified range, returning a fallback if the value is not finite.
 */
export function clampNumber(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}

// Default values for validation
export const VALIDATION_DEFAULTS = {
  glowColor: "#FFFFFB",
  glowIntensity: 1,
  glowSpread: 300,
  borderRadius: "16px",
  proximity: 32,
} as const;

// Validation ranges
export const VALIDATION_RANGES = {
  glowIntensity: { min: 0, max: 1 },
  glowSpread: { min: 1, max: 2000 },
  proximity: { min: 0, max: 500 },
} as const;
