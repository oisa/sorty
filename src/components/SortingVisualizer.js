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

class SortingVisualizerThreeTest extends Component {

  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(randomIntFromInterval(5, 100));
    }
    this.setState({ array });
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

    let array = this.state.array;

    let swapped = true;

    let end = array.length - 1;

    while (swapped === true) {
      swapped = false;
      for (let i = 0; i < end; i++) {

          if (array[i] > array[i+1]) {

            [ array[i], array[i+1] ] = [ array[i+1], array[i] ];
            swapped = true;

            this.setState({
              array: array,
            })
          }

      }
      end--;
    }

    return array;
  }


  bubbleSort2() {
    let inputArr = this.state.array;
    let len = inputArr.length;
    let swapped;
    do {
      swapped = false;

      for (let i = 0; i < len; i++) {

        console.log('outside the setTimeout');

        setTimeout(() => {

            if (inputArr[i] > inputArr[i + 1]) {

                let tmp = inputArr[i];
                inputArr[i] = inputArr[i + 1];
                inputArr[i + 1] = tmp;
                swapped = true;

                this.setState({
                  array: inputArr,
                })
            }
            console.log('inside the setTimeout');

          }, i * 100);

      }
    } while (swapped);
    return inputArr;
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

  render() {
    return (
      <div className="visualiser-container">

        {/*<div className="visualiser">
          { this.state.array.map((val, idx) => (
            <div className="array-bar" key={ idx } style={{height: `${ val }px`, width: "5px"}}>
            </div>
          )) }
        </div>*/}

        <div className="visualiser-buttons">

          <button onClick={() => this.resetArray()}>Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.testSortingAlgorithms()}>Test Algo</button>

        </div>

        <button className="btn-sort" onClick={() => this.bubbleSort2()}>
          Sort
          <SortIcon />
        </button>

        <Canvas
          colorManagement
          shadowMap
          camera={{ position: [-130, 30, 130], fov: 60 }}>
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
            {/*<mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -3, 0]}
              receiveShadow>
              <planeBufferGeometry attach='geometry' args={[100, 100]} />
              <shadowMaterial attach='material' opacity={0.3} />
            </mesh>*/}
            {/*<SpinningMesh
              position={[0, 1, 0]}
              color='red'
              args={[3, 2, 1]}
              speed={2}
            />
            <SpinningMesh position={[-2, 1, -5]} color='pink' speed={2} />
            <SpinningMesh position={[5, 1, -2]} color='pink' speed={2} />*/}

            { this.state.array.map((val, idx) => (
              <SpinningMesh position={[ idx-100, val-35, idx]} args={[1, 1, 1]} key={ idx } color='red' speed={`0.${val}`} keyIdx={ idx } />
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

export default SortingVisualizerThreeTest;
