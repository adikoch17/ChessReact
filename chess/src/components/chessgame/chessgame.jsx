import React from 'react'
import Chessboard from 'chessboardjsx'
import Chess from  "chess.js";
import './chessgame.css'



class ChessGame extends React.Component{
    constructor(props){
        super(props);
        this.state={
            fen:'start',
            myturn:true,
            isWhite:false,
            room:this.props.roomid,
            width:560,
            winner:'',
            gameOver:'false'
        }
    }

    componentDidMount() {
        this.game = new Chess();
        this.setState({isWhite:this.props.isCreator,myturn:this.props.isCreator});
        this.props.getColor(this.state.isCreator)
        this.props.socket.on('reset-from-server',data=>{
          if(data==='reset'){
            this.game = new Chess();
            this.setState({fen:this.game.fen()});
            this.setState({myturn:this.state.isWhite});
            this.setState({winner:''});
            this.setState({myturn:false,gameOver:'false'});
          }
        })
        this.props.socket.on('move-from-server',data =>{
          console.log(data);
          var sourceSquare = data.sourceSquare;
          var targetSquare = data.targetSquare;
          let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q" // always promote to a queen for example simplicity
          });
          console.log(move);
          if(move !== null){
            this.setState({myturn:!this.state.myturn})
          }
          if(this.game.game_over()){
            console.log("checkmate",move.color);
            if(move.color==='w'){
              this.setState({winner:'White'});
              
            }
            else if(move.color==='b'){
              this.setState({winner:'Black'});
            }
            this.setState({myturn:false,gameOver:'true'});
          }
          // illegal move
          if (move === null) return;
          this.setState({fen:this.game.fen()});
        })
      }

    onDrop = ({ sourceSquare, targetSquare }) => {
      this.props.socket.emit('move',[{sourceSquare:sourceSquare,targetSquare:targetSquare},{room:this.state.room}]);
      };
      
      resetGame =  () =>{
        this.props.socket.emit('reset',this.state.room)
      }

      setOrientation = (isWhite) =>{
        if(isWhite){
          return 'white';
        }
        else{
          return 'black';
        }
      }

    checkWidth =(w,h)=>{
      if(this.state.width>=560){
        if(w<560){
          this.setState({width:300})
        }
      }
      if(this.state.width<560){
        if(w>560){
          this.setState({width:560})
        }
      }
    }

    showWinner = ()=>{
      if(this.state.gameOver==='true'){
        console.log('you won')
        return(
          <div id="winnerModal">
            <div id="winnerCont">
               <h1>{this.state.winner} has won!</h1>
               <button id="newGame" onClick={this.resetGame}>new game</button>
            </div>
          </div>
        );
      }
    }

    render(){
        
    return(
        <div>
            <Chessboard 
            position={this.state.fen} 
            transitionDuration={0}
            onDrop={this.onDrop}
            draggable={this.state.myturn}
            orientation ={this.setOrientation(this.state.isWhite)}
            calcWidth = {({ screenWidth:w, screenHeight: h })=>{this.checkWidth(w,h)}}
            width = {this.state.width}
            />
            <button onClick={this.resetGame}>reset</button> 
            {
              this.showWinner()
            }
        </div>
     );

    }

}

export default ChessGame;