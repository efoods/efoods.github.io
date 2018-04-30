
import React from '../coms/react';
import Tag from './parts/tag';
import Card from './parts/card';
class APP extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div id="app">
					<Tag/>
					<Card imgSrc="../../imgs/pic0.jpg" />
					<Card imgSrc="../../imgs/pic1.jpg" />
					<Card imgSrc="../../imgs/pic2.jpg" />
					<Card imgSrc="../../imgs/pic3.jpg" />
					<Card imgSrc="../../imgs/pic4.jpg" />
					<Card imgSrc="../../imgs/pic5.jpg" />
					<Card imgSrc="../../imgs/pic6.jpg" />
					<Card imgSrc="../../imgs/pic7.jpg" />
			   </div>
	}
}
export default APP;