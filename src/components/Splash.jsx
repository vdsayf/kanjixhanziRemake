import {useState, useEffect} from "react";
import anime from 'animejs/lib/anime.es.js';

const Splash = ({}) => {

  const [invis, setInvis] = (false)

  const handleClick = () => {
    anime({
      targets: '.splash',
      opacity: [0, 100],
      duration: 1000,
      direction: 'reverse',
      easing: 'easeInOutExpo',
      complete: setInvis(true)
    })
  }
  const renderSplash = () => {
    if (invis) {
      return <div></div>
    } else {
    return (<div className = "splash absolute bg-white w-full h-full w-full z-50">
      <button className = "absolute center border-black border-2 h-10 w-[100px] font-zen font-bold" onClick = {handleClick}>Welcome</button>
    </div>)
    }
  }

  return (
    <div>
      {renderSplash()}
    </div>


  )
}

export default Splash;