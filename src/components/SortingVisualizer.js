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


  resetArray() {
    const array = [];
    for (let i = 0; i < 30; i++) {
      array.push(randomIntFromInterval(5, 30));
    }
    this.setState({ array: array, arraySteps: array });
  }


  determineMethod() {
    if ( this.props.sortName === 'bubble' ) {
      this.bubbleSort();
    }
    if ( this.props.sortName === 'insertion' ) {
      console.log('insertion');
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "black";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 10);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${ newHeight }px`;
        }, i * 10);
      }
    }
  }


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


  bubbleSortAlt() {
    let inputArr = this.state.arraySteps;
    let storeArr = [];
    let swapped;
    do {
      swapped = false;

      for (let i = 0; i < inputArr.length; i++) {

          if (inputArr[i] > inputArr[i + 1]) {

              let tmp = inputArr[i];
              inputArr[i] = inputArr[i + 1];
              inputArr[i + 1] = tmp;
              swapped = true;

              storeArr = [...storeArr, inputArr]
          }

          this.setState({
            arraySteps: [...storeArr],
          })

      }
    } while (swapped);

    setTimeout(() => {

      for (let i = 0; i < storeArr.length; i++) {

        console.log('test')

        console.log(storeArr[i]);

        setTimeout(() => {

          this.setState({
            array: storeArr[i],
          })

        }, i * 1000);

      };

    }, 1000);

  }


  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      for (let i = 0; i < randomIntFromInterval(1, 1000); i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }


  // findMeAFunction() {
  //  switch (this.props.method) {
  //   case this.props.method === "bubble":
  //     return this.bubbleSort()
  //     break;
  //   default:
  //     break;
  // }};


  render() {
    return (
      <div className="visualiser-container">

        {/*<div className="visualiser">
          { this.state.array.map((val, idx) => (
            <div className="array-bar" key={ idx } style={{height: `${ val }px`, width: "5px"}}>
            </div>
          )) }
        </div>*/}

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
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}

// Merge Sort

// // Initial solution
// const mergeSort = array => {
//   if (array.length === 1) return array;
//   const middleIdx = Math.floor(array.length / 2);
//   const firstHalf = mergeSort(array.slice(0, middleIdx));
//   const secondHalf = mergeSort(array.slice(middleIdx));
//   const sortedArray = [];
//   let i = 0, j = 0;
//   while (i < firstHalf.length && j < secondHalf.length) {
//     if (firstHalf[i] < secondHalf[j]) {
//       sortedArray.push(firstHalf[i++]);
//     } else {
//       sortedArray.push(secondHalf[j++]);
//     }
//   }
//   while (i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//   while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
//   return sortedArray;
// };

function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export default SortingVisualizer;
