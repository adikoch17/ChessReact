import React from 'react'
import './coj.css'


const CreateOrjoin = ({setCreator,changeRoute}) =>{

    const onClickCreateGame = () =>{
        setCreator(true);
        changeRoute('game')
    }
    const onClickJoinGame = () =>{
        setCreator(false);
        changeRoute('game')
    }

    return(
        <div id="coj">
        <button onClick={onClickCreateGame} className="primary">create game</button>
        <button onClick={onClickJoinGame} className="secondary">join game</button>
        </div>
    );
}
export default CreateOrjoin;