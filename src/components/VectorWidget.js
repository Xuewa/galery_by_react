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
var VectorWidget = React.createClass({
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
    var path = Path().moveTo(45, 30)
      .arc(0, radius * 2, radius)
      .arc(0, radius * -2, radius)
      .close();
    return (
      <Surface
        width={110}
        height={110}
        style={{cursor: 'pointer',backgroundColor:'rgba(255, 255, 255, 0)',
                position:'absolute',top:0,right:10}}>
        {this.renderGraphic(this.state.degrees)}
        <Shape d={path} stroke="rgb(227, 159, 146);" fill="rgb(227, 159, 146);" strokeWidth={3} transform={new Transform().translate(10, 10)}/>

      </Surface>
    );
  },

  /**
   * Better SVG support for React coming soon.
   */
  renderGraphic: function(rotation) {
    return (
        <Circle radius={50} stroke="rgb(227, 159, 146);" strokeWidth={3} fill="rgb(227, 159, 146,.5);"
                transform={new Transform().translate(55, 55)} />
    );
  }
});


module.exports = VectorWidget;

