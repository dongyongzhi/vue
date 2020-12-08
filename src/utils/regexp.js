
export function routeMatchList(string, regList) {
  let matched = false
  regList.some(function(s) {
    let regString = ''
    if (s.substring(s.length - 2) === '/*') {
      regString = s.substring(0, s.length - 2).replace(/\*/g, '.*') + '($|/.*$)'
    } else {
      regString = s.replace(/\*/g, '.*') + '/?$'
    }
    const reg = new RegExp(regString, 'i')
    if (string.match(reg)) {
      matched = true
      return true
    }
  })
  return matched
}
