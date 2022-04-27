export const formatName = (name: string) => {
  const splittedName = name.split('-')
  return `${splittedName[0][0].toUpperCase()}${splittedName[0].substring(
    1
  )} ${splittedName[1].toUpperCase()}`
}
