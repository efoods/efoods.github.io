// window.
import React from '../coms/react';
import ReactDOM from '../coms/react-dom';
import Layout from './layout';
class A extends React.Component{
    constructor(props){
        super(props);
        this.onclick=this.onclick.bind(this);
        this.state = props
    }
    render(){
        return  <div className ="app" >
                    <video className = "AppBgVideo" src={this.props.src} autoPlay loop  poster={this.props.poster}>
                    </video>
                    <Layout/>
                </div>
    }
    onclick(){
		
}
}
ReactDOM.render(<A src="./media/bg1.mp4" poster="./imgs/pic7.jpg" ></A>,document.getElementById('mainBox'))