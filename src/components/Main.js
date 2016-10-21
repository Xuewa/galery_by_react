require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

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
		CenterPos:{
			posX:0,
			posy:0
		},
		LeftArea:{
			posSecX:[0,0],
			posSecy:[0,0]
		},
		RightArea:{
			posSecX:[0,0],
			posSecy:[0,0]
		},
		TopArea:{
			posSecX:[0,0],
			posSecy:[0,0]
		}
	},
	reArrageArrFunc:function(centerIndex){
		var 
		var arrangeArr=[];
		// 中心区域
		if(arrangeArr[centerIndex]) arrangeArr[centerIndex]=this.areaScale.CenterPos;
		//上区域
		//	随机获取0-1个点
		var topNum=Math.ceil(Math.random()*2);

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
		var stageDom=ReactDOM.findDOMNode(this.refs.stage),
			stageW=stageDom.scrollWidth,
			stageH=stageDom.scrollHeight,
			halfStageW=Math.ceil(stageW/2),
			halfStageH=Math.ceil(stageH/2);

		var imgFigDom=ReactDOM.findDOMNode(this.refs.imgFig0),
			imgW=imgFigDom.scrollWidth,
			imgH=imgFigDom.scrollHeight,
			halfImgW=Math.ceil(imgW/2),
			halfImgH=Math.ceil(imgH/2);

		//中心图片的位置
		this.areaScale.CenterPos.posX=halfStageW-halfImgW;
		this.areaScale.CenterPos.posY=halfStageY-halfImgY;

		//上区域范围
		this.areaScale.TopArea.posSecX=[halfStageW-imgW,halfStageW];
		this.areaScale.TopArea.posSecY=[-halfImgH,halfStageH-halfImgH*3];
		//左区域范围
		this.areaScale.TopArea.posSecX=[-halfImgW,halfStageW-halfImgW*3];
		this.areaScale.TopArea.posSecY=[-halfImgH,stageH-halfImgH];
		//右区域范围
		this.areaScale.TopArea.posSecX=[halfStageW+halfImgW,stageW-halfImgW];
		this.areaScale.TopArea.posSecY=[-halfImgH,stageH-halfImgH];

		this.reArrageArrFunc(0);
	},
	render:function() {
		var imageUnit=[],
			controllerUnit=[];
		console.log(this.state.imgArrageArrList);
		// 循环images
		imageDatas.forEach(function(value,index){
			imageUnit.push(<ImgFigure data={value} ref={'imgFig'+index} />);
		});
			return (
				<section className="stage" ref="stage">
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
