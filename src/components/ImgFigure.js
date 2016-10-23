require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

var ImgFigure=React.createClass({
	clickHandler:function(e){
		if(this.props.arrange.isCenter)
			this.props.inverseFunc(); //图片为中心图片，执行翻转
		else this.props.centerFunc();//否则，移动中心位置
		e.stopPropagation();
      	e.preventDefault();
	},
	render:function(){
		var styleObj=this.props.arrange.pos;
		if(this.props.arrange.rotate){
			var prefixArr=['mos','os','Webkit'];
			prefixArr.forEach(function(value){
				styleObj[value+'Transform']='rotate('+this.props.arrange.rotate+'deg)';
			}.bind(this));
		}
		if(this.props.arrange.isCenter)	styleObj['zIndex']=11;
		var figClazz='img-figure';
		if(this.props.arrange.isInverse) figClazz+=' isInverse';

		// console.log(styleObj);
		return(
			<figure className={figClazz} style={styleObj} onClick={this.clickHandler}>
				<img src={this.props.data.imageURL} alt={this.props.data.title} />
				<figCaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-desc">
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figCaption>
			</figure>
		);
	},
});
module.exports=ImgFigure;
