// window.


import React from '../coms/react';
import ReactDOM from '../coms/react-dom';
class A extends React.Component{
    constructor(prop){
        super(prop);
        this.onclick=this.onclick.bind(this);
        this.state = prop
    }
    render(){
        return<div id="app">
                    <video className = "AppBgVideo" src={this.props.src} autoPlay loop  poster={this.props.poster}>
                    </video>
                    {this.children}
              </div>
    }
    onclick(){
    }
}
ReactDOM.render(<A src="./media/bg1.mp4" poster="./imgs/pic7.jpg" ></A>,document.getElementById('mainBox'))