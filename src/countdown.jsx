import { useState } from "react";
function Countdown(Props){
    let [days,setDays] = useState(0);
    let [hour,setHour] = useState(0);
    let [minute,setMinute] = useState(0);
    let [second,setSecond] = useState(0);
    let countDownDate = new Date(Props.target).getTime();
    setInterval(()=>{
        let now = new Date().getTime();
        let duration = countDownDate-now;
        setDays(Math.floor(duration / (1000 * 60 * 60 * 24)));
        setHour(Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
        setMinute( Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60)));
        setSecond(Math.floor((duration % (1000 * 60)) / 1000));
    },1000)
    return(
        <span className="countdown">{days}:{hour}:{minute}:{second} <span>({Props.event})</span></span>
    )
}
export default Countdown;