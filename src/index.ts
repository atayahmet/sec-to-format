const units = {
  '%Y': 946080000,
  '%MM': 2592000,
  '%W': 604800,
  '%D': 86400,
  '%H': 3600,
  '%m': 60,
  '%s': 1,
} as Record<string, number>;

const unitKeys = Object.keys(units);

const secToFormat = (
  seconds: number = 0,
  format: string = '',
  options: Record<string, any> = {},
) => {
  const { setters = {} } = options;
  const matchedKeys = Array.from(new Set(format.match(/(%\w{1,2})/g) || []));
  let i = 0;

  check: while (unitKeys.length > i) {
    const key = unitKeys[i];
    const matchedKey = matchedKeys.find(k => k === key);
    i++;

    if (!matchedKey) {
      continue check;
    }

    let result = 0;

    if (seconds > 0) {
      const unit = units[matchedKey];
      result = Math.floor(seconds / unit);
      seconds = seconds - result * unit;
    }

    const { [key]: setter = (val: any) => val } = setters;
    format = format.replace(new RegExp(key, 'g'), setter(result));
  }

  return format;
};

export default secToFormat;
