const db = require('../db/db.js');
const makePair = require('../language/translator.js');

console.log('controller')

exports.search = async (req,res) => {
  console.log('get 1111')
  console.log('query:', req.query.string)
  db.getPairs(req.query.string)
    .then((data)=>{
      res.send(data)
    }).catch((err)=>{console.log('getDB ERROR', err); res.send(500)})
}
exports.retrieveAll = async (req,res) => {
  console.log('get ALL')
  db.getAll()
    .then((data)=>{
      console.log(data)
      res.send(data);
    }).catch((err)=>{console.log('getDB ERROR', err); res.send(500)})
}
exports.postPair = async (req,res) => {
  console.log(req.body, 'POST')
  const result = await makePair(req.body.data);
  console.log('result is ', result)
  db.findConflict(result)
  .then((data)=>{
    if (data.length === 0) {
      console.log('save success')
      db.save(result);
      res.send(result);
    } else {
      console.log('Pair exists already')
      res.send({})
    }
  }).catch((err)=>{ console.log('saveError in FIND: ', err)})
}
