require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
//import Rectangle from './rectangle';
import PathEle from './PathEle';

var GaleryByReactApp=React.createClass({

	render:function() {
    var wid=100,hei=100;
    var x=0,y=10;

    return (
					//<Rectangle  width={wid} height={hei} x={x} y={y}/>
            <PathEle />
	    	);
	}
});

GaleryByReactApp.defaultProps = {
};

export default GaleryByReactApp;
