require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

var ImgFigureTest=React.createClass({

  render:function(){

    return(
      <figure className="test" >
        <figCaption>
          <h2 className="img-title">title</h2>
          <div className="img-desc">
            <p>
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium ad at, deleniti explicabo, facilis fugit in non perspiciatis provident, quae quas quos. Dolorum maxime qui quisquam repellat, voluptas voluptatem!
            </p>
          </div>
        </figCaption>
      </figure>
    );
  },
});
module.exports=ImgFigureTest;
