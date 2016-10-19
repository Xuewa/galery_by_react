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

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
      	<section className="img-sec">
      	</section>
      	<nav className="controller-nav">

      	</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
