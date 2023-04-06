String.prototype.firstLetterCaps = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export const layoutFix = (str, reverse) => {
    let replacer = {
      "Ф": "A", "И": "B", "С": "C", "В": "D", "У": "E", "А": "F"
    };
   
    reverse && Object.keys(replacer).forEach(key => {
      let v = replacer[key]
      delete (replacer[key])
      replacer[v] = key
    })
      
    for (let i = 0; i < str.length; i++) {
        if (replacer[str[i].toUpperCase()] != undefined) {
            let replace = replacer[str[i].toUpperCase()];
   
            str = str.replace(str[i], replace);
      }
    }

    return str;
}

export const fioToNewCase = (fio) => {
    let name = fio.toLowerCase()
    let arr = name.split(' ')
    let fion = ''
    for (let i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
            fion += arr[i].firstLetterCaps()
        } else {
            fion += arr[i].firstLetterCaps() + ' '
        }
        return fion
    }
}