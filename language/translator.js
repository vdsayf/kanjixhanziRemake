const OpenCC = require('opencc-js');
const { translate } = require('bing-translate-api');

// translate('全部', 'ja', 'zh-Hans').then(res => {
//   console.log(res.translation);
// }).catch(err => {
//   console.error(err);
// });

const c2j = OpenCC.Converter({ from: 'cn', to: 'jp' });
const j2c = OpenCC.Converter({ from: 'jp', to: 'cn' });

const jaTrans = (str) => {
  return translate(str, 'zh-Hans', 'ja')
  .then((data)=>{
    return data.translation
  }).catch((err)=>{console.log('ERROR', err)});
}
const cnTrans = (str) => {
  return translate(str, 'ja', 'zh-Hans')
  .then((data)=>{
    return data.translation
  }).catch((err)=>{console.log('ERROR', err)});
}

const detectLang = (input) => {
  return translate(input, null, "en")
    .then((data) => {
      return (data.language.from);
    }).catch((err)=>{console.log('makePair ERROR: ', err)})
}

const option1 = {
  from: 'ja',
  to: 'zh-CN'
}
const option2 = {
  from: 'zh-CN',
  to: 'ja'
}

const makePair = async (input) => {
  let detectString = await detectLang(input);
  if (detectString === 'zh-Hant' || detectString === 'ja') {
    let initConv = j2c(input);
    let directTranslate = await cnTrans(input, option1)
    let convTranslate = await jaTrans(initConv, option2)
    return (ratePair(input,initConv,directTranslate,convTranslate))
  } else if (detectString === 'zh-Hans') {
    let initConv = c2j(input);
    let directTranslate = await jaTrans(input, option2)
    let convTranslate = await cnTrans(initConv, option1)
    return (ratePair(input,initConv,directTranslate,convTranslate))
  } else if (detectString === 'en') {
    let jaTranslate = await translate(input, 'en', 'ja')
    let cnTranslate = await translate(input, 'en', 'zh-Hans')
    return (ratePair(jaTranslate, j2c(jaTranslate), cnTranslate, c2j(cnTranslate)))
  }
}

const ratePair = (input, initConv, directTrans, convTrans) => {
  let crossMatch1 = 0;
  let misMatch1 = 0;
  let finalScore = 0;
  for (let i = 0; i < initConv.length; i++) {
    misMatch1 += 1;
    for (let j = 0; j < directTrans.length; j++) {
      if (initConv.charAt(i) === directTrans.charAt(j)) {
        crossMatch1 += 1;
      }
    }
  }
  let score1 = crossMatch1/(misMatch1)
  let crossMatch2 = 0;
  let misMatch2 = 0;

  for (let i = 0; i < input.length; i++) {
    misMatch2 += 1;
    for (let j = 0; j < convTrans.length; j++) {
      if (input.charAt(i) === convTrans.charAt(j)) {
        crossMatch2 += 1;
      }
    }
  }
  let score2 = crossMatch2/(misMatch2)

  finalScore = (score1+score2)/2

  return {'input': input, 'translate': directTrans, 'score': finalScore}
}

module.exports = makePair
