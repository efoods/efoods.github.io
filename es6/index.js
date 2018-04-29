// window.


import React from '../coms/react';
import ReactDOM from '../coms/react-dom';
import D from './de.js';
class A extends React.Component{
    constructor(prop){
        super(prop);
        this.onclick=this.onclick.bind(this);
        this.state = prop
    }
    render(){
        return <div onClick = {this.onclick}>{this.state.items.map((value,i)=>{
            return <li key={i}>{value}</li>
        })}</div>
    }
    onclick(){
    }
}
let data = new D({a:[3]},{
    'a.0':'f.m.c.f.g'
});
const prop ={items: [3,6,7,9]}
ReactDOM.render(<A {...prop} />,document.getElementById('mainBox'))