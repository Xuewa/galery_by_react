require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigure';
import ControllerUnit from './ControllerUnit';


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
		var flag=Math.random()>0.5?'-':'';
		return flag+this.getRandomValue(0,30);
	},
	/**
	 * [getInverseFunc 返回翻转函数]
	 * @return {[Function]}
	 * */
	getInverseFunc:function(index){
		return function(){
			var imgArrageArrList=this.state.imgArrageArrList;
			imgArrageArrList[index].isInverse=
			!imgArrageArrList[index].isInverse;
			this.setState({
				imgArrageArrList:imgArrageArrList
			});

		}.bind(this);
	},
	/**
	 * [getCenterFunc 重排列中间img]
	 * @return {[Function]}
	 * */
	getCenterFunc:function(index){
		return function(){
			this.reArrageArrFunc(index);
		}.bind(this);
	},
	reArrageArrFunc:function(centerIndex){
		var arrangeArr=this.state.imgArrageArrList,
			topArr=[],
			leftArr=[],
			rightArr=[],
			centerArr=[];
		console.log(centerIndex);
		// 中心区域
		if(arrangeArr[centerIndex])
			centerArr=arrangeArr.splice(centerIndex,1);
		centerArr[0].pos=this.areaScale.CenterPos;
		centerArr[0].rotate=0;
		centerArr[0].isCenter=true;
		console.log(centerArr);
		//上区域
		//	随机获取0-2个点
		var topNum=Math.floor(Math.random()*2);
		topArr=arrangeArr.splice(centerIndex,topNum);
		topArr.forEach(function(arrItem,index){
			var _left=this.getRandomValue(this.areaScale.TopArea.posSecX[0],this.areaScale.TopArea.posSecX[1]);
			var _top=this.getRandomValue(this.areaScale.TopArea.posSecY[0],this.areaScale.TopArea.posSecY[1]);
			topArr[index]={
				pos:{
					top:_top+'px',
					left:_left+'px',
					zIndex:10
				},
				rotate:this.getRandomRotateDeg(),
				isCenter:false
			}
		}.bind(this));
		// console.log(topArr);
		// 左区域+右区域
		var leftNum=Math.ceil(arrangeArr.length/2);
		for (var i =0;i<= arrangeArr.length - 1; i++) {
			//left
			if(i<leftNum) {
				var _left=this.getRandomValue(this.areaScale.LeftArea.posSecX[0],this.areaScale.LeftArea.posSecX[1]);
				var _top=this.getRandomValue(this.areaScale.LeftArea.posSecY[0],this.areaScale.LeftArea.posSecY[1]);
				arrangeArr[i]={
					pos:{
						top:_top+'px',
						left:_left+'px',
						zIndex:10
					},
					rotate:this.getRandomRotateDeg(),
					isCenter:false
				}
			}else{
				var _left=this.getRandomValue(this.areaScale.RightArea.posSecX[0],this.areaScale.RightArea.posSecX[1]);
				var _top=this.getRandomValue(this.areaScale.RightArea.posSecY[0],this.areaScale.RightArea.posSecY[1]);
				arrangeArr[i]={
					pos:{
						top:_top+'px',
						left:_left+'px',
						zIndex:10
					},
					rotate:this.getRandomRotateDeg(),
					isCenter:false
				}

			}
		};

		if(topNum>0){
			arrangeArr.splice(centerIndex,0,topArr[0]);
		}
		// 中间区域一定最后加
		arrangeArr.splice(centerIndex,0,centerArr[0]);
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
			rotate:0deg,//旋转角度
			isInverse:false,//是否翻转
			isCenter:false //是否中心
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

		// 循环images
		imageDatas.forEach(function(value,index){
			if(!this.state.imgArrageArrList[index])
				this.state.imgArrageArrList[index]=
				{
					pos:{
						left:0,
						top:0
					},
					rotate:0,
					isInverse:false,
					isCenter:false
				};
			imageUnit.push(<ImgFigure data={value}
				centerFunc={this.getCenterFunc(index)}
				inverseFunc={this.getInverseFunc(index)}
				arrange={this.state.imgArrageArrList[index]}
				ref={'imgFig'+index} />);
			controllerUnit.push(<ControllerUnit
				arrange={this.state.imgArrageArrList[index]}
				centerFunc={this.getCenterFunc(index)}
				inverseFunc={this.getInverseFunc(index)}
				ref={'controllerUnit'+index} />);
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
