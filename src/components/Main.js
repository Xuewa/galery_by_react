require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
// 获取图片相关数据
var imageDatas = require('../Data/ImageDatas.json');
// 利用自执行函数，将图片名信息装成url信息
imageDatas=(function(imageDatas){
	for (var i =0;i<= imageDatas.length - 1;i++) {
		var imageObj=imageDatas[i];
		imageObj.imageURL=require('../images/'+imageDatas[i].fileName);
		imageDatas[i]=imageObj;
	}
	return imageDatas;
})(imageDatas);

var ImgFigure=React.createClass({
	render:function(){
		return(
			<figure className="img-figure">
				<img src={this.props.data.imageURL} 
				alt={this.props.data.title} />
				<figCaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figCaption>
			</figure>
		);
	},
});

var GaleryByReactApp=React.createClass({
	areaScale:{
		LeftArea:{
			posSecX:[0,0],
			posSecy:[0,0]
		},
		RightArea:{
			posSecX:[0,0],
			posSecy:[0,0]
		},
		topArea:{
			posSecX:[0,0],
			posSecy:[0,0]
		}
	},
	getInitialState:function() {
		return {imgArrageArrList:[
		/* {
				left:,
				top:,
			}
		*/
		]};
	},
	componentDidMount:function() {
		
	},
	render:function() {
		var imageUnit=[],
			controllerUnit=[];
		console.log(this.state.imgArrageArrList);
		// 循环images
		imageDatas.forEach(function(value){
			imageUnit.push(<ImgFigure data={value} />);
		});
			return (
				<section className="stage">
					<section className="img-sec">
						{imageUnit}
					</section>
					<nav className="controller-nav">
						{controllerUnit}
					</nav>
				</section>
	    	);
	}
});

GaleryByReactApp.defaultProps = {
};

export default GaleryByReactApp;
