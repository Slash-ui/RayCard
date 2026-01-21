import { describe, it, expect } from "vitest";
import {
  isValidCssColor,
  isValidBorderRadius,
  clampNumber,
  VALIDATION_DEFAULTS,
  VALIDATION_RANGES,
} from "./validation";

describe("isValidCssColor", () => {
  describe("hex colors", () => {
    it("accepts valid 3-character hex colors", () => {
      expect(isValidCssColor("#fff")).toBe(true);
      expect(isValidCssColor("#FFF")).toBe(true);
      expect(isValidCssColor("#abc")).toBe(true);
      expect(isValidCssColor("#123")).toBe(true);
    });

    it("accepts valid 4-character hex colors (with alpha)", () => {
      expect(isValidCssColor("#fffa")).toBe(true);
      expect(isValidCssColor("#FFFA")).toBe(true);
      expect(isValidCssColor("#1234")).toBe(true);
    });

    it("accepts valid 6-character hex colors", () => {
      expect(isValidCssColor("#ffffff")).toBe(true);
      expect(isValidCssColor("#FFFFFF")).toBe(true);
      expect(isValidCssColor("#FFFFFB")).toBe(true);
      expect(isValidCssColor("#123456")).toBe(true);
      expect(isValidCssColor("#abcdef")).toBe(true);
    });

    it("accepts valid 8-character hex colors (with alpha)", () => {
      expect(isValidCssColor("#ffffffaa")).toBe(true);
      expect(isValidCssColor("#FFFFFFAA")).toBe(true);
      expect(isValidCssColor("#12345678")).toBe(true);
    });

    it("rejects invalid hex colors", () => {
      expect(isValidCssColor("#")).toBe(false);
      expect(isValidCssColor("#f")).toBe(false);
      expect(isValidCssColor("#ff")).toBe(false);
      expect(isValidCssColor("#fffff")).toBe(false);
      expect(isValidCssColor("#fffffff")).toBe(false);
      expect(isValidCssColor("#fffffffff")).toBe(false);
      expect(isValidCssColor("#ggg")).toBe(false);
      expect(isValidCssColor("#gggggg")).toBe(false);
      expect(isValidCssColor("fff")).toBe(false);
      expect(isValidCssColor("ffffff")).toBe(false);
    });
  });

  describe("rgb/rgba colors", () => {
    it("accepts valid rgb colors", () => {
      expect(isValidCssColor("rgb(255, 255, 255)")).toBe(true);
      expect(isValidCssColor("rgb(0, 0, 0)")).toBe(true);
      expect(isValidCssColor("rgb(128, 128, 128)")).toBe(true);
      expect(isValidCssColor("rgb(255,255,255)")).toBe(true);
      expect(isValidCssColor("RGB(255, 255, 255)")).toBe(true);
    });

    it("accepts valid rgba colors", () => {
      expect(isValidCssColor("rgba(255, 255, 255, 1)")).toBe(true);
      expect(isValidCssColor("rgba(255, 255, 255, 0)")).toBe(true);
      expect(isValidCssColor("rgba(255, 255, 255, 0.5)")).toBe(true);
      expect(isValidCssColor("rgba(0, 0, 0, .5)")).toBe(true);
    });

    it("rejects invalid rgb/rgba colors", () => {
      expect(isValidCssColor("rgb(255, 255)")).toBe(false);
      expect(isValidCssColor("rgb(255, 255, 255, 1, 1)")).toBe(false);
      expect(isValidCssColor("rgb()")).toBe(false);
      expect(isValidCssColor("rgb(abc, def, ghi)")).toBe(false);
    });
  });

  describe("hsl/hsla colors", () => {
    it("accepts valid hsl colors", () => {
      expect(isValidCssColor("hsl(0, 100%, 50%)")).toBe(true);
      expect(isValidCssColor("hsl(360, 0%, 0%)")).toBe(true);
      expect(isValidCssColor("hsl(180, 50%, 50%)")).toBe(true);
      expect(isValidCssColor("HSL(0, 100%, 50%)")).toBe(true);
    });

    it("accepts valid hsla colors", () => {
      expect(isValidCssColor("hsla(0, 100%, 50%, 1)")).toBe(true);
      expect(isValidCssColor("hsla(0, 100%, 50%, 0)")).toBe(true);
      expect(isValidCssColor("hsla(0, 100%, 50%, 0.5)")).toBe(true);
    });

    it("rejects invalid hsl/hsla colors", () => {
      expect(isValidCssColor("hsl(0, 100, 50)")).toBe(false);
      expect(isValidCssColor("hsl()")).toBe(false);
    });
  });

  describe("named colors", () => {
    it("accepts valid named colors", () => {
      expect(isValidCssColor("red")).toBe(true);
      expect(isValidCssColor("blue")).toBe(true);
      expect(isValidCssColor("green")).toBe(true);
      expect(isValidCssColor("transparent")).toBe(true);
      expect(isValidCssColor("white")).toBe(true);
      expect(isValidCssColor("black")).toBe(true);
      expect(isValidCssColor("rebeccapurple")).toBe(true);
    });

    it("accepts named colors case-insensitively", () => {
      expect(isValidCssColor("RED")).toBe(true);
      expect(isValidCssColor("Red")).toBe(true);
      expect(isValidCssColor("TRANSPARENT")).toBe(true);
    });

    it("rejects invalid named colors", () => {
      expect(isValidCssColor("notacolor")).toBe(false);
      expect(isValidCssColor("reddish")).toBe(false);
      expect(isValidCssColor("")).toBe(false);
    });
  });

  describe("CSS injection attempts", () => {
    it("rejects CSS injection attempts", () => {
      expect(isValidCssColor("red;background:url(javascript:alert(1))")).toBe(false);
      expect(isValidCssColor("red);background:url(evil.com")).toBe(false);
      expect(isValidCssColor("#fff;--evil:value")).toBe(false);
      expect(isValidCssColor("expression(alert(1))")).toBe(false);
      expect(isValidCssColor("url(javascript:alert(1))")).toBe(false);
      expect(isValidCssColor("var(--evil)")).toBe(false);
      expect(isValidCssColor("calc(1px + 1px)")).toBe(false);
    });
  });

  describe("whitespace handling", () => {
    it("handles leading/trailing whitespace", () => {
      expect(isValidCssColor("  red  ")).toBe(true);
      expect(isValidCssColor("  #fff  ")).toBe(true);
      expect(isValidCssColor("  rgb(255, 255, 255)  ")).toBe(true);
    });
  });
});

describe("isValidBorderRadius", () => {
  describe("valid values", () => {
    it("accepts pixel values", () => {
      expect(isValidBorderRadius("16px")).toBe(true);
      expect(isValidBorderRadius("0px")).toBe(true);
      expect(isValidBorderRadius("100px")).toBe(true);
      expect(isValidBorderRadius("1.5px")).toBe(true);
    });

    it("accepts em values", () => {
      expect(isValidBorderRadius("1em")).toBe(true);
      expect(isValidBorderRadius("0.5em")).toBe(true);
      expect(isValidBorderRadius("2.5em")).toBe(true);
    });

    it("accepts rem values", () => {
      expect(isValidBorderRadius("1rem")).toBe(true);
      expect(isValidBorderRadius("0.5rem")).toBe(true);
      expect(isValidBorderRadius("2rem")).toBe(true);
    });

    it("accepts percentage values", () => {
      expect(isValidBorderRadius("50%")).toBe(true);
      expect(isValidBorderRadius("0%")).toBe(true);
      expect(isValidBorderRadius("100%")).toBe(true);
    });

    it("accepts plain numeric values", () => {
      expect(isValidBorderRadius("16")).toBe(true);
      expect(isValidBorderRadius("0")).toBe(true);
      expect(isValidBorderRadius("1.5")).toBe(true);
    });

    it("accepts multiple values (shorthand)", () => {
      expect(isValidBorderRadius("16px 8px")).toBe(true);
      expect(isValidBorderRadius("16px 8px 4px")).toBe(true);
      expect(isValidBorderRadius("16px 8px 4px 2px")).toBe(true);
      expect(isValidBorderRadius("1em 0.5em")).toBe(true);
      expect(isValidBorderRadius("50% 25%")).toBe(true);
    });
  });

  describe("invalid values", () => {
    it("rejects invalid units", () => {
      expect(isValidBorderRadius("16vw")).toBe(false);
      expect(isValidBorderRadius("16vh")).toBe(false);
      expect(isValidBorderRadius("16pt")).toBe(false);
    });

    it("rejects CSS injection attempts", () => {
      expect(isValidBorderRadius("16px;border:none")).toBe(false);
      expect(isValidBorderRadius("16px;--evil:value")).toBe(false);
      expect(isValidBorderRadius("calc(16px + 8px)")).toBe(false);
      expect(isValidBorderRadius("var(--radius)")).toBe(false);
    });

    it("rejects empty or invalid input", () => {
      expect(isValidBorderRadius("")).toBe(false);
      expect(isValidBorderRadius("abc")).toBe(false);
      expect(isValidBorderRadius("px")).toBe(false);
    });

    it("rejects too many values", () => {
      expect(isValidBorderRadius("16px 8px 4px 2px 1px")).toBe(false);
    });
  });

  describe("whitespace handling", () => {
    it("handles leading/trailing whitespace", () => {
      expect(isValidBorderRadius("  16px  ")).toBe(true);
      expect(isValidBorderRadius("  16px 8px  ")).toBe(true);
    });
  });
});

describe("clampNumber", () => {
  describe("normal clamping", () => {
    it("returns value when within range", () => {
      expect(clampNumber(0.5, 0, 1, 0.5)).toBe(0.5);
      expect(clampNumber(100, 0, 200, 100)).toBe(100);
      expect(clampNumber(0, 0, 1, 0.5)).toBe(0);
      expect(clampNumber(1, 0, 1, 0.5)).toBe(1);
    });

    it("clamps to minimum when below range", () => {
      expect(clampNumber(-1, 0, 1, 0.5)).toBe(0);
      expect(clampNumber(-100, 0, 200, 100)).toBe(0);
    });

    it("clamps to maximum when above range", () => {
      expect(clampNumber(2, 0, 1, 0.5)).toBe(1);
      expect(clampNumber(500, 0, 200, 100)).toBe(200);
    });
  });

  describe("non-finite values", () => {
    it("returns fallback for NaN", () => {
      expect(clampNumber(NaN, 0, 1, 0.5)).toBe(0.5);
      expect(clampNumber(NaN, 0, 100, 50)).toBe(50);
    });

    it("returns fallback for Infinity", () => {
      expect(clampNumber(Infinity, 0, 1, 0.5)).toBe(0.5);
      expect(clampNumber(-Infinity, 0, 1, 0.5)).toBe(0.5);
    });
  });

  describe("edge cases", () => {
    it("handles equal min and max", () => {
      expect(clampNumber(5, 5, 5, 5)).toBe(5);
      expect(clampNumber(0, 5, 5, 5)).toBe(5);
      expect(clampNumber(10, 5, 5, 5)).toBe(5);
    });

    it("handles negative ranges", () => {
      expect(clampNumber(-5, -10, -1, -5)).toBe(-5);
      expect(clampNumber(-20, -10, -1, -5)).toBe(-10);
      expect(clampNumber(0, -10, -1, -5)).toBe(-1);
    });
  });
});

describe("VALIDATION_DEFAULTS", () => {
  it("has expected default values", () => {
    expect(VALIDATION_DEFAULTS.glowColor).toBe("#FFFFFB");
    expect(VALIDATION_DEFAULTS.glowIntensity).toBe(1);
    expect(VALIDATION_DEFAULTS.glowSpread).toBe(300);
    expect(VALIDATION_DEFAULTS.borderRadius).toBe("16px");
    expect(VALIDATION_DEFAULTS.proximity).toBe(32);
  });
});

describe("VALIDATION_RANGES", () => {
  it("has expected ranges for glowIntensity", () => {
    expect(VALIDATION_RANGES.glowIntensity.min).toBe(0);
    expect(VALIDATION_RANGES.glowIntensity.max).toBe(1);
  });

  it("has expected ranges for glowSpread", () => {
    expect(VALIDATION_RANGES.glowSpread.min).toBe(1);
    expect(VALIDATION_RANGES.glowSpread.max).toBe(2000);
  });

  it("has expected ranges for proximity", () => {
    expect(VALIDATION_RANGES.proximity.min).toBe(0);
    expect(VALIDATION_RANGES.proximity.max).toBe(500);
  });
});
