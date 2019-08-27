import 'aframe';
import React from 'react';
import {Box, Icosahedron, Cylinder, Plane, Sky, Text, Scene} from 'react-aframe-ar'

class App extends React.Component {
  state = {
    box: {
      pos: '-1 0.5 -3',
      rot: '0 0 0',
      color: '#4CC3D9'
    },
    sphere: {
      pos: '0 1.25 -5',
      rad: 1.25,
      color: '#EF2D5E'
    },
    cylinder: {
      pos: '2 0.75 -3',
      rad: 0.5,
      ht: 1.5,
      color: '#FFC65D'
    },
    plane: {
      pos: '0 0 -4',
      rot: '-90 0 0',
      width: 20,
      ht: 40,
      color: '#7BC8A4'
    }
  }
  componentDidMount () {
    var tag = document.createElement('script');
    tag.src = 'https://unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js';
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(tag);
  }
  render () {
    const {box, sphere, cylinder, plane} = this.state
    return (
        <Scene>
          <Box position="-10 0.5 -3" rotation="0 0 0" color="#4CC3D9" depth="48" height="2" width="1" shadow></Box>
          <Box position="10 0.5 -3" rotation="0 0 0" color="#4CC3D9" depth="48" height="2" width="1" shadow></Box>
          <Box position="0 0.5 -24" rotation="0 0 0" color="#4CC3D9" depth="1" height="2" width="24" shadow></Box>
          <Box position={box.pos} rotation={box.rot} color={box.color} shadow></Box>
          <Icosahedron position={sphere.pos} radius={sphere.rad} color={sphere.color} shadow></Icosahedron>
          <Cylinder position={cylinder.pos} radius={cylinder.rad} height={cylinder.ht} color={cylinder.color} shadow></Cylinder>
          <Plane position={plane.pos} rotation={plane.rot} width={plane.width} height={plane.ht} color={plane.color} shadow></Plane>
          <Sky color="#ECECEC"></Sky>
          <Text value="Hello world, react-aframe!" align="center" position="0 2.3 -1.5" color="#7BC8A4"></Text>
        </Scene>
        )
  }
}

export default App;
