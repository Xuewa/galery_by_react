require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
// import ImgFigure from '../ImgFigure';

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
		var styleObj=this.props.arrange.pos;
		var prefixArr=['mos','os','Webkit'];
		prefixArr.forEach(function(value){
			styleObj[value+'Transform']='rotate('+this.props.arrange.rotate+')';
		}.bind(this));
		console.log(styleObj);
		return(
			<figure className="img-figure" style={styleObj}>
				<img src={this.props.data.imageURL} alt={this.props.data.title} />
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
			left:0,
			top:0
		},
		LeftArea:{
			posSecX:[0,0],
			posSecY:[0,0]
		},
		RightArea:{
			posSecX:[0,0],
			posSecY:[0,0]
		},
		TopArea:{
			posSecX:[0,0],
			posSecY:[0,0]
		}
	},
	getRandomValue:function(min,max){
		var randValue=Math.ceil(Math.random()*(max-min)+min);
		return randValue;
	},
	getRandomRotateDeg:function(){
		var flag=Math.ceil(Math.random()>0.5?'-':'');
		return flag+this.getRandomValue(0,30);
	},
	reArrageArrFunc:function(centerIndex){
		// var _this=this;
		var arrangeArr=[],
			topArr=[],
			leftArr=[],
			rightArr=[],
			centerArr=[];
		// 中心区域
		if(this.state.imgArrageArrList[centerIndex]) 
			centerArr=this.state.imgArrageArrList.splice(centerIndex,1);
		centerArr[0].pos=this.areaScale.CenterPos;
		centerArr[0].rotate+='deg';
		// console.log(centerArr);
		//上区域
		//	随机获取0-2个点
		var topNum=Math.ceil(Math.random()*2);
		topArr=this.state.imgArrageArrList.splice(centerIndex,topNum);
		topArr.forEach(function(arrItem,index){
			var _left=this.getRandomValue(this.areaScale.TopArea.posSecX[0],this.areaScale.TopArea.posSecX[1]);
			var _top=this.getRandomValue(this.areaScale.TopArea.posSecY[0],this.areaScale.TopArea.posSecY[1]);
			topArr[index]={
				pos:{
					top:_top+'px',
					left:_left+'px'
				},
				rotate:this.getRandomRotateDeg()+'deg'
			}
		}.bind(this));

		// 左区域
		var len=this.state.imgArrageArrList.length;
		leftArr=this.state.imgArrageArrList.splice(0,Math.ceil(len/2));
		leftArr.forEach(function(arrItem,index){
			console.log(this.areaScale.LeftArea.posSecX[0]+'--'+this.areaScale.LeftArea.posSecX[1]);
			var _left=this.getRandomValue(this.areaScale.LeftArea.posSecX[0],this.areaScale.LeftArea.posSecX[1]);
			var _top=this.getRandomValue(this.areaScale.LeftArea.posSecY[0],this.areaScale.LeftArea.posSecY[1]);
			// console.log(_top+'--'+_left);
			leftArr[index]={
				pos:{
					top:_top+'px',
					left:_left+'px'
				},
				rotate:this.getRandomRotateDeg()+'deg'
			}
		}.bind(this));

		// 右区域
		len=this.state.imgArrageArrList.length;
		// console.log(len);
		rightArr=this.state.imgArrageArrList.splice(0,len);
		rightArr.forEach(function(arrItem,index){
			var _left=this.getRandomValue(this.areaScale.RightArea.posSecX[0],this.areaScale.RightArea.posSecX[1]);
			var _top=this.getRandomValue(this.areaScale.RightArea.posSecY[0],this.areaScale.RightArea.posSecY[1]);
			rightArr[index]={
				pos:{
					top:_top+'px',
					left:_left+'px'
				},
				rotate:this.getRandomRotateDeg()+'deg'
			}
		}.bind(this));

		arrangeArr=arrangeArr.concat(centerArr,topArr,leftArr,rightArr);
		// console.log(arrangeArr.pos);
		this.setState({
			imgArrageArrList:arrangeArr
		});
	},
	getInitialState:function() {
		return {imgArrageArrList:[
		/* {
			pos:{
				left:,
				top:,
				}
			},
			rotate:0deg
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
		this.areaScale.CenterPos.left=halfStageW-halfImgW+'px';
		this.areaScale.CenterPos.top=halfStageH-halfImgH+'px';

		//上区域范围
		this.areaScale.TopArea.posSecX=[halfStageW-imgW,halfStageW];
		this.areaScale.TopArea.posSecY=[-halfImgH,halfStageH-halfImgH*3];
		//左区域范围
		this.areaScale.LeftArea.posSecX=[-halfImgW,halfStageW-halfImgW*3];
		this.areaScale.LeftArea.posSecY=[-halfImgH,stageH-halfImgH];
		//右区域范围
		this.areaScale.RightArea.posSecX=[halfStageW+halfImgW,stageW-halfImgW];
		this.areaScale.RightArea.posSecY=[-halfImgH,stageH-halfImgH];

		this.reArrageArrFunc(0);
		// console.log(this.state.imgArrageArrList);
	},
	render:function() {
		var imageUnit=[],
			controllerUnit=[];

		console.log(this.state.imgArrageArrList);
		// 循环images
		imageDatas.forEach(function(value,index){
			if(!this.state.imgArrageArrList[index])
				this.state.imgArrageArrList[index]=
				{
					pos:{
						left:0,
						top:0
					},
					rotate:0
				};
			imageUnit.push(<ImgFigure data={value} 
				arrange={this.state.imgArrageArrList[index]} ref={'imgFig'+index} />);
		}.bind(this));

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
