/**
 * Copyright 2013 Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";

var React = require('react');
var ReactART = require('react-art');
var Circle = require('react-art/lib/Circle.art');
var Group = ReactART.Group;
var Shape = ReactART.Shape;
var Path = ReactART.Path;

var Surface = ReactART.Surface;
var Transform = ReactART.Transform;

var BASE_VEL = 0.15;
var NOW_IS_PLAY=true;
var NOW_IS_PAUSE=false;

/**
 * An animated SVG component.
 */
var Player = React.createClass({
  /**
   * Initialize state members.
   */
  getInitialState: function() {
    return {degrees: 0,playerStatus:NOW_IS_PLAY};
  },

  /**
   * When the component is mounted into the document - this is similar to a
   * constructor, but invoked when the instance is actually mounted into the
   * document. Here's, we'll just set up an animation loop that invokes our
   * method. Binding of `this.onTick` is not needed because all React methods
   * are automatically bound before being mounted.
   */
  componentDidMount: function() {
    this._interval = window.setInterval(this.onTick, 20);
  },

  componentWillUnmount: function() {
    window.clearInterval(this._interval);
  },

  onTick: function() {
    if(this.state.playerStatus==NOW_IS_PLAY){
      var nextDegrees = this.state.degrees + BASE_VEL ;
      this.setState({degrees: nextDegrees});
    }
  },

  /**
   * Cause the rotation to "spring".
   */
  handleMouseUp: function() {
    var sta=!this.state.playerStatus;
    this.setState({playerStatus:sta });
    if(this.state.playerStatus==NOW_IS_PAUSE) this.refs.audio.pause();
    else if(this.state.playerStatus==NOW_IS_PLAY) this.refs.audio.play();

  },

  /**
   * This is the "main" method for any component. The React API allows you to
   * describe the structure of your UI component at *any* point in time.
   */
  render: function() {
    var rotation=this.state.degrees;
    if(this.state.playerStatus==NOW_IS_PLAY) {
      return(
      <section className="mp3Player">
        {this.renderPlayerSurf(rotation)}
        <audio ref="audio" autoPlay="autoPlay" loop="loop"
               src="http://7xkinp.com1.z0.glb.clouddn.com/%E6%9B%B2%E5%A9%89%E5%A9%B7%20-%20Everything%20In%20The%20World.mp3"/>
      </section>
    )}else{
      return (
        <section className="mp3Player">
          {this.renderPauseSurf(rotation)}
          <audio ref="audio" autoPlay="autoPlay" loop="loop"
                 src="http://7xkinp.com1.z0.glb.clouddn.com/%E6%9B%B2%E5%A9%89%E5%A9%B7%20-%20Everything%20In%20The%20World.mp3"/>
        </section>
      );
    }
  },

  /**
   * Better SVG support for React coming soon.
   */
  renderPlayerSurf: function(rotation) {
    var pathB=Path().moveTo(40,30).lineTo(40,60)
      .lineTo(35,60).lineTo(35,30).close();
    var pathC=Path().moveTo(55,30).lineTo(55,60)
      .lineTo(50,60).lineTo(50,30).close();
    return (
      <Surface className="playStatus" width={90}  height={90}  style={{cursor: 'pointer',backgroundColor:'rgba(255, 255, 255, 0)',
                  position:'absolute',top:0,right:10}}>
        <Group  onMouseUp={this.handleMouseUp} rotation={rotation} originX={45} originY={45}>
          <Circle radius={40} stroke="rgb(227, 159, 146);" strokeWidth={3} fill="rgb(227, 159, 146,.5);"
                  transform={new Transform().translate(45, 45)} />
          <Group>
            <Shape d={pathB} stroke="rgb(227, 159, 146);" fill="rgb(227, 159, 146);" strokeWidth={3} />
            <Shape d={pathC} stroke="rgb(227, 159, 146);" fill="rgb(227, 159, 146);" strokeWidth={3}/>
          </Group>
        </Group>
      </Surface>);
  },
  renderPauseSurf: function(stopRotation) {
    var pathA = Path().moveTo(60, 45)
      .lineTo(35, 30).lineTo(35, 60).close();
    return (
      <Surface  className="pauseStatus" width={90}  height={90}  style={{cursor: 'pointer',backgroundColor:'rgba(255, 255, 255, 0)',
                  position:'absolute',top:0,right:10}}>
        <Group  onMouseUp={this.handleMouseUp} rotation={stopRotation} originX={45} originY={45}>
          <Circle radius={40} stroke="rgb(227, 159, 146);" strokeWidth={3} fill="rgb(227, 159, 146,0.5);"
                  transform={new Transform().translate(45, 45)} />
          <Group>
            <Shape d={pathA} stroke="rgb(227, 159, 146);" fill="rgb(227, 159, 146);" strokeWidth={3} />
          </Group>
        </Group>
      </Surface> );
  }
});


module.exports = Player;

