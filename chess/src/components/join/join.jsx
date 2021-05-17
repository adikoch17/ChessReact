import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './join.css'


const Join  =({changeRoute,isCreator,enterRoom,socket}) =>{
    
    const [room,setRoom] = useState('');
    useEffect(()=>{
        if(isCreator){
            setRoom(uuidv4());
            
        }
    },[]);

    const onIdInputChange = (event) =>{
        var value = event.target.value;
        setRoom(value);
    }

    const onClickJoin = () =>{
        socket.emit('room',room);
        enterRoom(room);
        changeRoute('game');
    }

    const showIdToShare = (isCreator) =>{
        if(isCreator){
            return <div id="code">share this code with your friend <br/> <b>{room}</b></div>
        }
        else{
            return <div><input type="text" id="roomId" onChange={onIdInputChange}/></div>
        }
    }
    return(
        <div id="join">
            {
                showIdToShare(isCreator)
            }
            <button onClick ={onClickJoin} id="joinbtn">Join</button>
        </div>
    )
}

export default Join;