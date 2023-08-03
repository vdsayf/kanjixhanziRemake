require('dotenv').config();

const CONNECTIONPARAMS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION, CONNECTIONPARAMS);

let schem = mongoose.Schema({
  input: String,
  translate: String,
  score: Number
})

const pairDB = mongoose.model('pairDB', schem);

let findConflict = (pair) => {
  return pairDB.find({$or:[
    { "input": pair.input },
    { "translate": pair.input },
    { "input": pair.translate },
    { "translate": pair.translate },
  ]})
}
let save = (pair) => {
  pairDB.create(pair).then((data)=>{console.log('pair created')}).catch((err)=>{console.log('creation error', err)})
}

let getPairs = (str) => {
  return pairDB.find({$or:[
    { "input": { "$regex": str, "$options": "i" } },
    { "translate": { "$regex": str, "$options": "i" } }
    ]}
  )
}

let getAll = () => {
  return pairDB.find()
}

module.exports.findConflict = findConflict;
module.exports.save = save;
module.exports.getPairs = getPairs;
module.exports.getAll = getAll;