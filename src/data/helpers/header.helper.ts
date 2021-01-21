export const bindHeaders = (headers: {[key: string]: string}): string[] => {
  return Object.keys(headers)
}
