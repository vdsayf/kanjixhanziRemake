import {useState, useEffect} from "react";

const Display = ({obj}) => {

  return (
    <div className = "flex flex-col text-9xl font-zen float-right">
      <div className = "topper text-right">
        {obj.input}
      </div>
        <hr className = "border-1 mt-4 border-slate-400"></hr>
      <div className = "botter text-right">
        {obj.translate}
      </div>
    </div>
  )
}

export default Display;