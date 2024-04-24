import Firebird from 'node-firebird'

var options = {}

options.host = '10.37.0.20'
options.port = 3050
options.database = 'C:/ACS/Base/ACS.fdb'
options.user = 'SYSDBA'
options.password = 'masterkey'
options.lowercase_keys = false // set to true to lowercase keys


export const findInBaseByKey = async (key, callback) => {
    Firebird.attach(options, function(err, db) {
        if (err){
            db.detach()
            return callback('error')
        }

        db.query("SELECT * FROM PERSONNEL WHERE KLUCH='" + key + "'", function(err, result) {
            if (err){
                db.detach()
                return callback('error')
            }
            db.detach()
            return callback(result[0])
        })
    })
}



// function sleep(ms) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
//   }

// function blobToFile(theBlob, fileName){
//     //A Blob() is almost a File() - it's just missing the two properties below which we will add
//     theBlob.lastModifiedDate = new Date()
//     theBlob.name = fileName
//     return theBlob
// }
