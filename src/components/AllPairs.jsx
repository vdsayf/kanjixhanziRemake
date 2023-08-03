import {useState, useEffect} from "react";
import router from '../routing.js'
import Pair from './Pair'

const AllPairs = ({pairList, setDisplayPair}) => {

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
            <Pair vocabObj = {curr} setDisplayPair = {setDisplayPair}></Pair>
          </div>
        )
        count = size;
      } else {
        currDiv.push(
          <div>
            <Pair vocabObj = {curr} setDisplayPair = {setDisplayPair}></Pair>
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