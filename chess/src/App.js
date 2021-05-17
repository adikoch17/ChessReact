import React , {useState} from 'react'
import './App.css';
import GamePage from './pages/gamepage/gamepage'
import CreateOrjoin from './pages/createorjoin/createorjoin';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001',{
  withCredentials: true
  });

export const sockContext = React.createContext();

const App = () => {


  const [route,setRoute] = useState('land');
  const [isCreator,setIsCreator] = useState(false)

  

  const changeRoute = (rt) =>{
    setRoute(rt);
  }

  const changeIsCreator = (crt) =>{
    setIsCreator(crt);
  }

  if(route==='land'){
    return(
      <div className="App">
        <CreateOrjoin setCreator={changeIsCreator} changeRoute={changeRoute}/>
      </div>
    );
  }
  else if(route==='game'){
    return(
      <div className="App">
        <GamePage isCreator={isCreator} socket ={socket}/>
      </div>
    );
  }
  else{
    return(
      <div className="App">
        <h2>Oops an error occurred</h2>
      </div>
    );
  }
 
}

export default App;


// component={CreateOrjoin} 
// component={GamePage}

// return (
//   <div className="App">
//    <Router>
//      <Route path='/' exact  render = {(props)=><CreateOrjoin {...props} setCreator = {setCreator}/>}/>
//      <Route path='/game' render = {(props)=><GamePage {...props} isCreator = {isCreator}/>}/>
//    </Router>
//   </div>
// );