import React from  'react'


const Msg = ({message}) =>{
    return(
        <div>
        <p><b>{message.color} :</b> <span style={{fontWeight:"300"}}>{message.data} <span style={{opacity:0.2}}>({message.timestamp})</span></span></p>
        {/* <p>{message.color+'('+message.timestamp+')'} : {message.data} </p> */}
        </div>
    );
}

export default Msg;