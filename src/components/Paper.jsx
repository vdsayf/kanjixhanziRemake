import {useState, useEffect} from "react";
import AllPairs from './AllPairs.jsx'
import Search from './Search.jsx'
import Display from './Display'
import router from '../routing.js'

const Paper = ({}) => {
  const [pairList, setPairList] = useState([])
  const [displayPair, setDisplayPair] = useState({
    input: "漢字",
    translate: "Convert",
    score: 0
  })
  const [meatballBool, setMeatballBool] = useState(false)

  const refill = () => {
    router.getAll()
    .then((data)=>{
      setPairList(data.data)
      setDisplayPair({
        input: "漢字",
        translate: "Convert",
        score: 0
      })
    })
    .catch((err)=>{console.log('AllClick Catch ERR')})
  }

  useEffect(()=>{
    refill()
  },[])

  const searchFor = (string) => {
    router.postPair(string)
    .then((d)=>{
      if (Object.keys(d.data).length > 0) {
        setDisplayPair(d.data);
        router.getLike(string)
        .then((data)=>{
          if (data.data.length > 0) {
            setPairList(data.data);
          }
        }).catch((err)=>{console.log('search', err)})
      } else {
        router.getLike(string)
        .then((data)=>{
          if (data.data.length > 0) {
            setPairList(data.data);
            setDisplayPair(data.data[0])
          }
        })
        .catch((err)=>{console.log('search', err)})
      }
    })
    .catch((err)=>{console.log('postCLick Catch ERR')})
  }

  return (
    <div>
    <div className = "flex flex-col w-11/12">
        <div className = "ml-auto">
          {(meatballBool)?
          <img className = "h-[273px]" src = "https://media.discordapp.net/attachments/1119419112486096957/1135677132362748004/Picsart_23-07-31_16-55-19-162.png?width=671&height=671"></img>
          :
          <Display obj = {displayPair}></Display>
          }
        </div>
        <div>
          <Search enterFunc = {searchFor} refill = {refill} meatball = {setMeatballBool}></Search>
        </div>
    </div>
    <div className = "flex flex-row w-11/12 overflow-hidden">
      <AllPairs pairList = {pairList} setDisplayPair = {setDisplayPair}></AllPairs>
    </div>
    </div>
  )
}

export default Paper;