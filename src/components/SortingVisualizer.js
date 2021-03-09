import React, { Component, useRef, useState } from 'react';
import { Canvas, useFrame } from "react-three-fiber";
import { softShadows, MeshWobbleMaterial, Stars, OrbitControls } from "drei";
import { useSpring, a } from "react-spring/three";

// Components
import SortIcon from '../assets/SortIcon';

softShadows();

const SpinningMesh = ({ position, color, speed, args }) => {

  const mesh = useRef();

  //useFrame allows us to re-render/update rotation on each frame
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      position={position}
      ref={mesh}
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach='material'
        factor={0.6}
      />
    </a.mesh>

  );
};

class SortingVisualizer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      array: [],
      arraySteps: [],
      speed: 50,
    };
  }


  componentDidMount() {
    this.resetArray();
  }


  resetArrayRandom() {
    const array = [];
    for (let i = 0; i < 30; i++) {
      array.push(randomIntFromInterval(5, 30));
    }
    this.setState({ array: array, arraySteps: array });
  }


  resetArray() {

    const array = [];
    const arrayShuffled = [];

    for (let i = 1; i < 30; i++) {
      array.push(i);
    }

    let m = array.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    this.setState({ array: array, arraySteps: array });

    console.log(array);
  }


  determineMethod() {
    if ( this.props.sortName === 'bubble' ) {
      this.bubbleSort();
    }
    else if ( this.props.sortName === 'insertion' ) {
      this.insertionSort();
    }
  }

// Bubble Sort /////////////////////////////////////////////////////////////////

  bubbleSort() {

    let array = this.state.arraySteps;

    let storeArr = [];

    let swapped = true;

    let end = array.length - 1;

    while (swapped === true) {
      swapped = false;
      for (let i = 0; i < end; i++) {

          if (array[i] > array[i+1]) {

            [ array[i], array[i+1] ] = [ array[i+1], array[i] ];
            swapped = true;

          }

          let tmp = [...array];

          storeArr.push(...[tmp]);

          console.log(tmp);
          // console.log(storeArr);

      }
      end--;
    }

    console.log(storeArr);

    setTimeout(() => {

      for (let i = 0; i < storeArr.length; i++) {

        console.log('test')

        console.log(storeArr[i]);

        setTimeout(() => {

          this.setState({
            array: storeArr[i],
          })

        }, i * this.state.speed);

      };

    }, 300);

  }

// Insertion Sort //////////////////////////////////////////////////////////////

  insertionSort() {

    let array = this.state.array;

    let storeArr = [];

    for (let i = 0; i < array.length; i++) {

      const item = array[i];

      for (var j = i-1; j >= 0 && array[j] > item; j--) {
        array[j+1] = array[j];
      }

      array[j+1] = item;

      let tmp = [...array];

      storeArr.push(...[tmp]);

      console.log(tmp);

    }

    setTimeout(() => {

      for (let i = 0; i < storeArr.length; i++) {

        console.log('test')

        console.log(storeArr[i]);

        setTimeout(() => {

          this.setState({
            array: storeArr[i],
          })

        }, i * this.state.speed);

      };

    }, 300);

    console.log(storeArr);

  }


  // bubbleSortAlt() {
  //   let inputArr = this.state.arraySteps;
  //   let storeArr = [];
  //   let swapped;
  //   do {
  //     swapped = false;
  //
  //     for (let i = 0; i < inputArr.length; i++) {
  //
  //         if (inputArr[i] > inputArr[i + 1]) {
  //
  //             let tmp = inputArr[i];
  //             inputArr[i] = inputArr[i + 1];
  //             inputArr[i + 1] = tmp;
  //             swapped = true;
  //
  //             storeArr = [...storeArr, inputArr]
  //         }
  //
  //         this.setState({
  //           arraySteps: [...storeArr],
  //         })
  //
  //     }
  //   } while (swapped);
  //
  //   setTimeout(() => {
  //
  //     for (let i = 0; i < storeArr.length; i++) {
  //
  //       console.log('test')
  //
  //       console.log(storeArr[i]);
  //
  //       setTimeout(() => {
  //
  //         this.setState({
  //           array: storeArr[i],
  //         })
  //
  //       }, i * 1000);
  //
  //     };
  //
  //   }, 1000);
  //
  // }


  render() {
    return (
      <div className="visualiser-container">

        <div className="visualizer-buttons">

          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <div className="slider-container">
            <p>Sort Speed</p>
            <input className="slider" type="range" min="1" max="100" value={this.state.speed} onChange={(e) => {this.setState({speed: e.target.value})}}/>
          </div>

        </div>

        <button className="btn-sort" onClick={() => this.determineMethod()}>
          Sort
          <SortIcon />
        </button>

        <Canvas
          colorManagement
          shadowMap
          camera={{ position: [-40, 25, 40], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <group>

            { this.state.array.map((val, idx) => (
              <SpinningMesh position={[ idx-30, val-5, idx]} args={[1, 1, 1]} key={ idx } color='red' speed={`0.${val}`} keyIdx={ idx } />
            )) }

          </group>
          <OrbitControls />
          {/*<Stars />*/}
        </Canvas>

      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
