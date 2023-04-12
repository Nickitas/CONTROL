import fs from 'fs'
import iconv from 'iconv-lite'


export const getAllStudents = async (req, res) => {
    let text = fs.readFileSync('./files/bobers_new.json')
    let bobers = JSON.parse(text)
    let result = []
    let date = new Date().valueOf()
    let date_in = new Date(date - 1 * 86400000)

    let mm = date_in.getMonth() + 1
    let dd = date_in.getDate()
    mm = mm < 10? '0' + mm: mm
    dd = dd < 10? '0' + dd: dd
    let fulldate = date_in.getFullYear().toString() + mm.toString() + dd.toString()
    let files = fs.readdirSync('../scud_log/logs')

    for (let k in files){
        let filename = files[k]
        if (filename.includes(fulldate)){
            let data = fs.readFileSync('../scud_log/logs/' + filename)
            data = iconv.decode(data, 'win1251').toLowerCase()
                    
            for (let i in bobers){
                let fio = bobers[i].fio.toLowerCase()
                if (data.includes(fio)){

                    let rows = data.split('\r\n')
                    let time_in = ''
                    let time_out = ''
                    for (let j = 0; j < rows.length; j++){
                        if (rows[j].includes(fio) && rows[j].includes('корпус')){
                            time_in = rows[j].split(';')[4].replace(/\s/g,'')
                            break
                        }
                    }
                    for (let j = rows.length-1; j > 0; j--){
                        if (rows[j].includes(fio) && rows[j].includes('улица')){
                            time_out = rows[j].split(';')[4].replace(/\s/g,'')
                            break
                        }
                    }
                    result.push({
                        id: bobers[i].id,
                        group: bobers[i].group,
                        fio: bobers[i].fio,
                        last_date: `${date_in.getFullYear().toString()}.${mm.toString()}.${dd.toString()}`,
                        time_in,
                        time_out
                    })
                }
                else{
                    result.push({
                        id: bobers[i].id,
                        group: bobers[i].group,
                        fio: bobers[i].fio,
                        last_date: '',
                        time_in: '',
                        time_out: ''
                    })
                }

            }
        }
    }
    return res.send({students: result})
}