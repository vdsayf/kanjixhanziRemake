import {useState, useEffect} from "react";

const Pair = ({vocabObj, setDisplayPair}) => {

  const [color, setColor] = useState("black")

  const splitWord = (ins) => {
    let arr = []
    for (let i = 0; i < ins.length; i++) {
      arr.push(ins.charAt(i))
    }
    return (
      <div className = "flex flex-col">
        {arr.map((v)=>{
          return (<div className = {`border-[1px] border-black bg-white h-8 w-8 pb-[1px] text-[20px] hover:bg-black hover:text-white hover:font-semibold transition-all duration-200`}>{v}</div>)
        })}
      </div>
    )
  }
  useEffect(()=>{
    setColor(renderConnect());
    console.log(color)
  },[])
  const renderConnect = () => {
    let score = vocabObj.score
    let color = "teal-200"
    if (score < 1 && score > 0.5) {
      color = "black"
    } else if (score < 0.25) {
      color = "red-500"
    } else if (score > 0.25 && score < 0.5) {
      color = "orange-500"
    }
    return (color)
  }

  return (
    <div className = "flex flex-row-reverse mt-8 hover:" onMouseOver = {()=>{setDisplayPair(vocabObj)}}>
          <div className = "mr-[2px]">{splitWord(vocabObj.input)}</div>
          <div className = "ml-[2px]">{splitWord(vocabObj.translate)}</div>
    </div>

  )
}

export default Pair;