
import React from '../coms/react';
import Tag from './parts/tag';
class APP extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div id="app">
					<Tag/>
					<img src="../../imgs/pic7.jpg" />
			   </div>
	}
}
export default APP;