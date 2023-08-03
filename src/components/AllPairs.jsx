import {useState, useEffect} from "react";
import router from '../routing.js'
import Pair from './Pair'

const AllPairs = ({pairList, setDisplayPair}) => {

  const renderConnect = (v) => {
    let score = v.score
    let color = "border-[1px] border-black bg-white h-8 w-8 pb-[1px] text-[20px] hover:bg-black hover:text-white hover:font-semibold transition-all duration-200"
    if (score < 1 && score > 0.5) {
      color = "border-[1px] border-black bg-white h-8 w-8 pb-[1px] text-[20px] hover:bg-yellow-300 hover:text-white hover:font-semibold transition-all duration-200"
    } else if (score < 0.25) {
      color = "border-[1px] border-black bg-white h-8 w-8 pb-[1px] text-[20px] hover:bg-pink-500 hover:text-white hover:font-semibold transition-all duration-200"
    } else if (score > 0.25 && score < 0.5) {
      color = "border-[1px] border-black bg-white h-8 w-8 pb-[1px] text-[20px] hover:bg-teal-300 hover:text-white hover:font-semibold transition-all duration-200"
    }
    return (color)
  }

  const renderPairs = () => {
    let arr = [];
    let currDiv = [];
    let count = 0;
    for (let i = pairList.length - 1; i >= 0; i--) {

      let curr = pairList[i]

      let size = Math.max(curr.input.length, curr.translate.length);
      count += size;
      if (count > 16) {
        arr.push(
          <div className = "ml-4 mr-4">
            {currDiv}
          </div>
          );
        currDiv = []
        currDiv.push(
          <div>
            <Pair vocabObj = {curr} setDisplayPair = {setDisplayPair} color = {renderConnect(curr)}></Pair>
          </div>
        )
        count = size;
      } else {
        currDiv.push(
          <div>
            <Pair vocabObj = {curr} setDisplayPair = {setDisplayPair}color = {renderConnect(curr)}></Pair>
          </div>
        )
        count += 1;
      }
    }
    arr.push(
      <div className = "ml-4 mr-4">
        {currDiv}
      </div>
      );
    return arr;
  }

  return (
    <div className = "flex flex-row-reverse pt-2 ml-auto overflow-x-auto">
      {renderPairs()}
    </div>
  )
}

export default AllPairs;