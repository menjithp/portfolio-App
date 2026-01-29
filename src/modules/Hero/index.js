import { useEffect ,useState,useRef} from 'react'
import './index.css'
import Button from '../../button'
import { AiFillAlipaySquare } from 'react-icons/ai'
export default ()=>{
    const [state,setState]=useState(true)
    const [state1,setState1]=useState(false)
    const[state2,setState2]=useState(true)
    const videoref=useRef()
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const callback=(e)=>{
        setState2(false);
        videoref.current.muted=false
        setState1(true)
        document.querySelector(".hero-section").removeEventListener('click',callback)

        videoref.current.addEventListener('click',()=>{
            if (videoref.current.paused){
                videoref.current.play();
                setState(true)
                videoref.current.muted=false;
                setState1(true)
        }
        else {
                videoref.current.pause();
                setState(false)}
        })

    }

  
return<div className='hero-section' id="Home">
    <div className={`${isMobile ?"change-video-value":""} video-container position-relative`}>
        <video ref={videoref} autoPlay muted  loop onLoadedData={()=>{
                 document.querySelector(".video-play-container").classList.add("opacity-one")
                 document.querySelector(".click-anywhere").classList.add("opacity-one")
                 document.querySelector(".hero-section").addEventListener('click',callback)
                 document.querySelector(".header").classList.add("header-opacity")
        }} onError={()=>{
            document.querySelector(".hero-section").remove()
            document.querySelector(".video-play-container").classList.add("opacity-one")
            document.querySelector(".header").classList.add("header-opacity")
        }}>
            <source src={`hero-videos/${isMobile?"kutti_puli.mp4":"battle_scene_tessa.mp4"}`} type="video/mp4" />
        </video>
        
        {state2 && <span className="click-anywhere wrapper position-absolute start-50 top-50">
                <h1 className={`fw-bold-1000 ${isMobile?"fs-1":"fs-5"}`}>Click Anywhere</h1>
        </span>}
       
        
        <span className="position-absolute video-play-container text-center rounded">
        {state1 ?  <Button className='not-show  audio-play-button' onClick={()=>{videoref.current.muted=true;setState1(false)}}>mute</Button>
            :<Button className={`${!state?"not-show":""} audio-play-button`} onClick={()=>{videoref.current.muted=false;setState1(true)}}>unmute</Button>
            }&nbsp;&nbsp;
          {state ?  <Button className='video-play-button' onClick={()=>{videoref.current.pause();
          setState(false)
          setState1(false)
          videoref.current.muted=true
        }}>Stop</Button>
            :<Button className='not-show video-play-button' onClick={()=>{videoref.current.play();
                setState(true);
                setState1(true)
                videoref.current.muted=false
               
            }}>Play</Button>
            }
        </span>
    </div>
</div>
}
