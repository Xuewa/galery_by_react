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

var MOUSE_UP_DRAG = 0.978;
var MOUSE_DOWN_DRAG = 0.9;
var MAX_VEL = 11;
var CLICK_ACCEL = 3;
var BASE_VEL = 0.15;

/**
 * An animated SVG component.
 */
var Player = React.createClass({
  /**
   * Initialize state members.
   */
  getInitialState: function() {
    return {degrees: 0, velocity: 0, drag: MOUSE_UP_DRAG};
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
    var nextDegrees = this.state.degrees + BASE_VEL + this.state.velocity;
    var nextVelocity = this.state.velocity * this.state.drag;
    this.setState({degrees: nextDegrees, velocity: nextVelocity});
  },

  /**
   * When mousing down, we increase the friction down the velocity.
   */
  handleMouseDown: function() {
    this.setState({drag: MOUSE_DOWN_DRAG});
  },

  /**
   * Cause the rotation to "spring".
   */
  handleMouseUp: function() {
    var nextVelocity = Math.min(this.state.velocity + CLICK_ACCEL, MAX_VEL);
    this.setState({velocity: nextVelocity, drag: MOUSE_UP_DRAG});
  },

  /**
   * This is the "main" method for any component. The React API allows you to
   * describe the structure of your UI component at *any* point in time.
   */
  render: function() {
    var radius=15;
    var pathA = Path().moveTo(60, 45)
      .lineTo(35, 30).lineTo(35, 60).close();
    var pathB=Path().moveTo(40,30).lineTo(40,60)
      .lineTo(35,60).lineTo(35,30).close();
    var pathC=Path().moveTo(55,30).lineTo(55,60)
      .lineTo(50,60).lineTo(50,30).close();
    var rotation=this.state.degrees;
    return (
      <section className="mp3Player">
        <Surface  className="pauseStatus" width={90}  height={90}  style={{cursor: 'pointer',backgroundColor:'rgba(255, 255, 255, 0)',
                  position:'absolute',top:0,right:10,display:'none'}}
                  onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
          <Group>
            <Circle radius={40} stroke="rgb(227, 159, 146);" strokeWidth={3} fill="rgb(227, 159, 146,0.5);"
                    transform={new Transform().translate(45, 45)} />
            <Group>
              <Shape d={pathA} stroke="rgb(227, 159, 146);" fill="rgb(227, 159, 146);" strokeWidth={3} />
            </Group>
          </Group>
        </Surface>
        <Surface  className="playStatus" width={90}  height={90}  style={{cursor: 'pointer',backgroundColor:'rgba(255, 255, 255, 0)',
                  position:'absolute',top:0,right:10}}
                  onMouseDown={this.handleMouseDown}  onMouseUp={this.handleMouseUp}>
          <Group  rotation={rotation} originX={45} originY={45}>
            <Circle radius={40} stroke="rgb(227, 159, 146);" strokeWidth={3} fill="rgb(227, 159, 146,.5);"
                  transform={new Transform().translate(45, 45)} />
            <Group>
              <Shape d={pathB} stroke="rgb(227, 159, 146);" fill="rgb(227, 159, 146);" strokeWidth={3} />
              <Shape d={pathC} stroke="rgb(227, 159, 146);" fill="rgb(227, 159, 146);" strokeWidth={3}/>
            </Group>
          </Group>
        </Surface>
      <audio autoPlay="autoPlay" loop="loop"
               src="http://7xkinp.com1.z0.glb.clouddn.com/%E6%9B%B2%E5%A9%89%E5%A9%B7%20-%20Everything%20In%20The%20World.mp3"/>
      </section>
    );
  },

  /**
   * Better SVG support for React coming soon.
   */
  renderGraphic: function(rotation) {
    return (
        <Circle rotation={rotation} originX={45} originY={45}
                radius={40} stroke="rgb(227, 159, 146);" strokeWidth={3} fill="rgb(227, 159, 146,.5);"
                transform={new Transform().translate(45, 45)} />
    );
  }
});


module.exports = Player;

