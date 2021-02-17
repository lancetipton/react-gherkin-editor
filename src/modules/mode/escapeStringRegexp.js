
export const escapeStringRegexp = str => str
  .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
  .replace(/-/g, '\\x2d')