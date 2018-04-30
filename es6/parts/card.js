import React from '../..//coms/react';

export default class extends  React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <dl className="p-card">
            <dt className="p-card-img-con">
                <img className="p-card-img" src={this.props.imgSrc} />
            </dt>
            <dd className="p-card-desc">
            this is a piece text
            </dd>
        </dl>
    }
}