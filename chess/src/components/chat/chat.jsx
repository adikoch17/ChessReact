import React,{useState,useEffect} from 'react'
import Msg from './msg/msg'
import './chat.css'

const Chat = ({socket,color,roomid}) =>{
const [inp,setInp] = useState('');
const [messageList,setMessageList] = useState([]);

useEffect(()=>{
    socket.on('message-from-server',data =>{
        console.log(data,'socket');
        var temp = messageList;
        temp.push(data);
        setMessageList([...temp]);
        console.log(messageList);
    })
},[])

const onChatInputChange = (event) =>{
    let value = event.target.value;
    setInp(value);
    console.log(inp);
}

const onCLickSend = (e) =>{
    document.getElementById('inpField').value='';
    if (e. keyCode == 13) {
        e. preventDefault();
        }
    e.preventDefault();
    let now = new Date().toLocaleTimeString();
    socket.emit('message',{room:roomid,message:{color:color,data:inp,timestamp:now}})
    console.log('click')
}

return(
    <div id="chatComp">
        <div id="messagesCont">
        <div id="headingChat"><h1>Chat</h1></div>
        <div id="messages">

            {   
                messageList.map((messageItem,i)=>{
                   return(<Msg key = {i} message={messageItem}/>);           
                })
            }
         </div>   
        </div>
        <div id="form">
            <form>
            <input type="text" onChange = {onChatInputChange} id="inpField" />
            <button onClick={onCLickSend} className="primary">SEND</button>
            </form>
        </div>
    </div>
);

}

export default Chat;