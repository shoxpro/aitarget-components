export const latLngRegex = /[(]?([\s]*[\-]?[\s]*\d{1,3}\.\d{4,6})[\s]*,?([\s]*[\-]?[\s]*\d{1,3}\.\d{4,6})[\s]*[)]?/;

export function getQuery (input: string): string {
  let query = '';

  if (!latLngRegex.test(input)) {
    query = input.toLowerCase()
                 .replace(/\s*/, ' ')
                 .trim();
  }

  return query;
}

export function getCustomLocationKey (input: string): string {
  let key = '';

  if (latLngRegex.test(input)) {
    let matches   = input.match(latLngRegex);
    let latitude  = Number(matches[1].trim());
    let longitude = Number(matches[2].trim());
    key           = `(${latitude}, ${longitude})`;
  }

  return key;
}
