module.exports = replace = (toSearch, toReplace, string, transformFunction) => {
  return string.replace(new RegExp(toSearch, 'g'), transformFunction(toReplace))
}
