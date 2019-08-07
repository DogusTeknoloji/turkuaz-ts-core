export function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function toCamelCase(str: string) {
  str = str.trim();
  return str.substr(0, 1).toLowerCase() + str.substr(1);
}
