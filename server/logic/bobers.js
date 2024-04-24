import fs from "fs"
// import iconv from "iconv-lite"
// import {findBoberByFIO} from './fb.js'
import xlsx from "xlsx-js-style"
import AdmZip from "adm-zip"


export const getAllBobers = async (callback) => {
    let text = fs.readFileSync('./files/bobers_new.json')
    let bobers = JSON.parse(text)
    let fio_list = []
    for (let i in bobers){
        fio_list.push(bobers[i].fio)
    }
    for (let k in bobers){
        bobers[k].last_date = '18.02.2023'
    }
    // await findBoberByFIO(bobers, fio_list, async (result) =>{
        // return callback({
        //     state: 1,
        //     result
        // })
    // })
    return callback({
        state: 1,
        bobers
    })
}

export const downloadBobers = async (callback) => {
    let text = fs.readFileSync('./files/bobers_new.json')
    let bobers = JSON.parse(text)
    let fio_list = []
    for (let i in bobers){
        fio_list.push(bobers[i].fio)
    }
    for (let k in bobers){
        bobers[k].last_date = '18.02.2023'
    }
    // await findBoberByFIO(bobers, fio_list, async (result) =>{
        // return callback({
        //     state: 1,
        //     result
        // })
    // })

    let Headers = [
        { v: 'ФИО', t: "s", s: { font: { sz: 14, bold: true } } }, 
        { v: 'Группа', t: "s", s: { font: { sz: 14, bold: true } } },
        { v: 'Крайняя дата прохода', t: "s", s: { font: { sz: 14, bold: true } } }, 
    ]
            
    let workbook = xlsx.utils.book_new()
    let worksheet = xlsx.utils.aoa_to_sheet([])

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Бобры')
    xlsx.utils.sheet_add_aoa(worksheet, [Headers], { origin: 'A1' })
    for (let i=0; i < bobers.length; i++){
        xlsx.utils.sheet_add_aoa(worksheet, [[bobers[i].fio, bobers[i].group, bobers[i].last_date] ], { origin: `A${i+2}` })
    }
    xlsx.utils.sheet_add_aoa(worksheet, [[{ v:'© ОСТК УКБ ДГТУ', t: "s", s: { font: { sz: 14, bold: true, color: { rgb: "404040" }  } } }] ], { origin: `A${bobers.length+4}` })

    let width_fio = bobers.reduce((w, r) => Math.max(w, r.fio.length), 10)
    let width_group = bobers.reduce((w, r) => Math.max(w, r.group.length), 10)

    worksheet["!cols"] = [ { wch: width_fio },{ wch: width_group + 20 }, { wch: 27 }]
    await xlsx.writeFile(workbook, './files/bobers_log.xlsx')

    const zip = new AdmZip()
    let file = fs.readFileSync('./files/bobers_log.xlsx')
    await zip.addFile('bobers_log.xlsx', file)

    await zip.writeZip(`./files/bobers.zip`)

    const stream = await fs.createReadStream(`./files/bobers.zip`)
    return callback(stream)
}
export const downloadBober = async (body, callback) => {
    let id = body.id
    let date_from = body.date_from
    let date_to = body.date_to

    let text = fs.readFileSync('./files/bobers_new.json')
    let bobers = JSON.parse(text)
    if (!bobers.filter(bober => bober.id == id)){
        return callback('id not found')
    }
    let fio = bobers.filter(bober => bober.id == id)[0].fio
    let search_fio = fio.toLowerCase()

    let unix_from = new Date(date_from)
    let unix_to = new Date(date_to).valueOf()
    // let files = fs.readdirSync('./logs')
    let res = []
    res.push([])

    unix_from = unix_from.valueOf() - (unix_from.getDay() - 1) * 86400000
    
    let dates_arr = []
    let weeks_count = 0
    for (let i = unix_from; i <= unix_to; i += 86400000){
        let date_in = new Date(i)
        let mm = date_in.getMonth() + 1
        let dd = date_in.getDate()
        mm = mm < 10? '0' + mm: mm
        dd = dd < 10? '0' + dd: dd
        let fulldate = date_in.getFullYear().toString()  + mm.toString() + dd.toString()
        let calendar_date = `${dd.toString()}.${mm.toString()}.${date_in.getFullYear().toString()}`
        dates_arr.push(calendar_date)
        // res[json_date] = true
        res[weeks_count].push(calendar_date)
        if (res[weeks_count].length == 6){
            i += 86400000
            res.push([])
            weeks_count++
        }
            
        // for (let i in files){
        //     let filename = files[i]
        //     if (filename.includes(fulldate)){
        //         let data = fs.readFileSync('./logs/' + filename)
        //         data = iconv.decode(data, 'win1251').toLowerCase()
        //         if (data.includes(search_fio)){
        //             res[json_date] = true
        //         }else{
        //             res[json_date] = false
        //         }
        //         break
        //     }
        // }
    }
        
    let start_date = dates_arr[0]
    let end_date = dates_arr[dates_arr.length-1]

    let Header = [
        { v: 'График-календарь', t: "s", s: { font: { sz: 16, bold: true } } }
    ]
            
    let workbook = xlsx.utils.book_new()
    let worksheet = xlsx.utils.aoa_to_sheet([])

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Бобер')
    xlsx.utils.sheet_add_aoa(worksheet, [Header], { origin: 'A1' })
    xlsx.utils.sheet_add_aoa(worksheet, [[{ v: fio, t: "s", s: { font: { sz: 16 } } }]], { origin: 'A2' })
    xlsx.utils.sheet_add_aoa(worksheet, [[{ v: `${start_date}-${end_date}`, t: "s", s: { font: { sz: 14 }, alignment: {horizontal: 'center'} } }]], { origin: 'A3' })
    xlsx.utils.sheet_add_aoa(worksheet, [['пн', 'вт', 'ср', 'чт', 'пт', 'сб' ]], { origin: 'A4' })
    const merge = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }, { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } }
    ]
    worksheet["!merges"] = merge

    for (let i = 0; i <= weeks_count; i++){
        xlsx.utils.sheet_add_aoa(worksheet, [res[i]], { origin: `A${i+5}` })
    }
    // xlsx.utils.sheet_add_aoa(worksheet, [[{ v:'© ОСТК УКБ ДГТУ', t: "s", s: { font: { sz: 14, bold: true, color: { rgb: "404040" }  } } }] ], { origin: `A${bobers.length+6}` })

    worksheet["!cols"] = [ { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }]
    await xlsx.writeFile(workbook, `./files/${fio}_${start_date}_${end_date}_log.xlsx`)

    const zip = new AdmZip()
    let file = fs.readFileSync(`./files/${fio}_${start_date}_${end_date}_log.xlsx`)
    await zip.addFile(`${fio}_${start_date}_${end_date}_log.xlsx`, file)

    await zip.writeZip(`./files/${fio}_${start_date}_${end_date}_log.zip`)

    const stream = await fs.createReadStream(`./files/${fio}_${start_date}_${end_date}_log.zip`)
    return callback(stream)
}

export const getBober = async (body, callback) => {
    let id = body.id

    let text = fs.readFileSync('./files/bobers_new.json')
    let bobers = JSON.parse(text)
    if (!bobers.filter(bober => bober.id == id)){
        return callback('id not found')
    }
    let fio = bobers.filter(bober => bober.id == id)[0].fio.toLowerCase()
    
    let unix_from = new Date('2023.02.06').valueOf()
    let unix_to = new Date().valueOf()
    // let files = fs.readdirSync('./logs')
    let res = []
    for (let i = unix_from; i <= unix_to; i += 86400000){
        let date_in = new Date(i)
        let mm = date_in.getMonth() + 1
        let dd = date_in.getDate()
        mm = mm < 10? '0' + mm: mm
        dd = dd < 10? '0' + dd: dd
        let fulldate = date_in.getFullYear().toString()  + mm.toString() + dd.toString()
        let calendar_date = `${date_in.getFullYear().toString()}-${mm.toString()}-${dd.toString()}`
        // res[json_date] = true
        res.push(calendar_date)
            
        // for (let i in files){
        //     let filename = files[i]
        //     if (filename.includes(fulldate)){
        //         let data = fs.readFileSync('./logs/' + filename)
        //         data = iconv.decode(data, 'win1251').toLowerCase()
        //         if (data.includes(fio)){
        //             res[json_date] = true
        //         }else{
        //             res[json_date] = false
        //         }
        //         break
        //     }
        // }
    }
    return callback({
        state: 1,
        body: {
            id,
            fio: bobers.filter(bober => bober.id == id)[0].fio,
            dates: res
        }
    })
}


// function get_bober_info(body, callback){
//     let text = fs.readFileSync('./files/bobers.json')
//     let bobers = JSON.parse(text)
//     let in_json = false
//     for (let data in bobers){
//         if (bobers[data].fio == body.fio){
//             in_json = true
//         }
//     }
//     if (!in_json){
//         return callback('Not exist in bobers list')
//     }
        
//     let unix_from = new Date(body.date_from).valueOf()
//     let unix_to = new Date(body.date_to).valueOf()
//     let files = fs.readdirSync('./logs')
//     let res = {}
//     for (let i = unix_from; i <= unix_to; i += 86400000){
//         let date_in = new Date(i)
//         let mm = date_in.getMonth() + 1
//         let dd = date_in.getDate()
//         mm = mm < 10? '0' + mm: mm
//         dd = dd < 10? '0' + dd: dd
//         let fulldate = date_in.getFullYear().toString()  + mm.toString() + dd.toString()
//         let json_date = `${dd.toString()}.${mm.toString()}.${date_in.getFullYear().toString()}`
            
//         for (let i in files){
//             let filename = files[i]
//             if (filename.includes(fulldate)){
//                 let data = fs.readFileSync('./logs/' + filename)
//                 data = iconv.decode(data, 'win1251').toLowerCase()
//                 if (data.includes(body.fio.toLowerCase())){
//                     res[json_date] = true
//                 }else{
//                     res[json_date] = false
//                 }
//                 break
//             }
//         }
//     }

//     return callback({
//         fio: body.fio,
//         dates: res
//     })
// }

// get_bober_info({fio: 'Балакин Дмитрий Алексеевич', date_from: '08.02.2023', date_from: '16.02.2023'}, e =>{
//     console.log(e)
// })

// console.log(get_all_bobers((e) => {console.log(e)}))

// console.log(get_bober({id: 'a1171b28-6560-4df8-93f5-d01cc5543dcb'}, (e) => {console.log(e)}))
