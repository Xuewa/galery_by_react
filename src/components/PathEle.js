/**
 * Created by Administrator on 2016/12/4 0004.
 */
var React = require('react');
var ReactART = require('react-art');
var Path = ReactART.Path;
var Shape= ReactART.Shape;
export default class PathEle extends React.Component {

  render() {
    var radius = 100;
    // 除close以外的所有方法都返回修改后的自身，因此支持链式调用
    var path = Path().moveTo(0, -radius)
      .arc(0, radius * 2, radius)
      .arc(0, radius * -2, radius)
      .close();

    // path可以直接赋值给d
    return <Shape d={path}></Shape>
  };
}
