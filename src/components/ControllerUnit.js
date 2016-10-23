require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

var ControllerUnit=React.createClass({
	clickHandler:function(e){
		if(this.props.arrange.isCenter)
			this.props.inverseFunc(); //图片为中心图片，执行翻转
		else this.props.centerFunc();//否则，移动中心位置
		console.log(e.target);
		e.stopPropagation();
      	e.preventDefault();
	},
	render:function(){
		var controllerClazz='controllerBtn';
		if(this.props.arrange.isCenter)
			controllerClazz+=' centerBtn';
		if(this.props.arrange.isInverse)
			controllerClazz+=' inverseBtn';
		return(
			<div className={controllerClazz} onClick={this.clickHandler}>
			</div>
		);
	},
});
module.exports=ControllerUnit;