require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import PathEle from './PathEle';



var GaleryByReactApp=React.createClass({

	render:function() {

			return (
				//<section className="stage" ref="stage">
					<PathEle className="path"/>

				//</section>
	    	);
	}
});

GaleryByReactApp.defaultProps = {
};

export default GaleryByReactApp;
