import {useState, useEffect} from "react";
import anime from 'animejs/lib/anime.es.js';

const Pair = ({vocabObj, setDisplayPair, color}) => {

  const splitWord = (ins) => {
    let arr = []
    for (let i = 0; i < ins.length; i++) {
      arr.push(ins.charAt(i))
    }
    return (
      <div className = "flex flex-col">
        {arr.map((v)=>{
          return (<div className = {color}>{v}</div>)
        })}
      </div>
    )
  }

  return (
    <div className = "pair flex flex-row-reverse mt-8 hover:" onMouseOver = {()=>{setDisplayPair(vocabObj)}}>
          <div className = "rightText mr-[2px]">{splitWord(vocabObj.input)}</div>
          <div className = "leftText ml-[2px]">{splitWord(vocabObj.translate)}</div>
    </div>

  )
}

export default Pair;