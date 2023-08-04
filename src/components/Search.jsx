import {useState, useEffect} from "react";
import router from '../routing.js'

const Search = ({enterFunc, refill, meatball}) => {

  const [searchVal, setSearchVal] = useState("")

  function inputChange(evt) {
    setSearchVal(evt.currentTarget.value);
  }

  function enterHit (evt) {
    if (evt.key === 'Enter') {
      if (evt.currentTarget.value.length > 0){
        if (searchVal === "meatball") {
          meatball(true)
        } else {
          meatball(false)
          enterFunc(searchVal)
        }
      } else {
        refill()
      }
      evt.currentTarget.value = '';
      setSearchVal('')
    }
  }

  return (
    <div>
      <input className = "mt-12 border-[1px] border-black focus:outline-none" onChange = {inputChange} onKeyDown = {enterHit}></input>
    </div>
  )
}

export default Search;