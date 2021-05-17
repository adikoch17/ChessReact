import React, { useState,useEffect } from 'react';
import ChessGame from '../../components/chessgame/chessgame';
import Join from '../../components/join/join';
import Chat from '../../components/chat/chat';
import './gamepage.css'

const GamePage = ({isCreator,socket}) =>{
    const [route,setRoute] = useState('join');
    const [roomid,setRoomId] = useState('');
    const [playerColor,setPlayerColor] = useState('');

    useEffect(()=>{
        if(playerColor===''){
            if(isCreator){
                setPlayerColor('white');
            }
            else{
                setPlayerColor('black');
            }
        }
    },[]);

    const changeRoute = (route) =>{
        setRoute(route);
    }

    const enterRoom = (rmid) =>{
        setRoomId(rmid)
    }

    const getColor = (clr) =>{

        if(clr===true){
            setPlayerColor('white')
        }
        else if(clr===false){
            setPlayerColor('black')
        }
    }

    if(route==='join'){
        return(
            <div >
                <Join changeRoute={changeRoute} isCreator={isCreator} enterRoom={enterRoom} socket={socket}/>
            </div>
        )
    }
    else if(route==='game'){
        return(
            <div id="gameCont">
                <ChessGame isCreator = {isCreator} socket={socket} roomid={roomid} getColor={getColor}/>
                <Chat socket={socket} color={playerColor} roomid={roomid}/>
            </div>
        );
    }
}

export default GamePage;