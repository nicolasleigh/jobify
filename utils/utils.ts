import { z } from "zod";

export function capitalizeEveryWord(text: string) {
  return text.replace(/\b\w/g, (m: string) => m.toUpperCase());
}

type EnumLike = {
  [key: string]: string;
};
// Case-insensitive enum for zod, check out: https://github.com/colinhacks/zod/discussions/730
export function zCoercedEnum(e: EnumLike) {
  return z.preprocess((val) => {
    const target = String(val)?.toLowerCase();
    for (const k of Object.values(e)) {
      if (String(k)?.toLowerCase() === target) {
        return k;
      }
    }
    return null;
  }, z.nativeEnum(e));
}
