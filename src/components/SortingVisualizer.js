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
      isActive: false,
      speed: 50,
      timer: 0,
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

    for (let i = 1; i < 31; i++) {
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

  }


  determineMethod() {
    if ( this.props.sortName === 'bubble' ) {
      this.bubbleSort();
    }
    else if ( this.props.sortName === 'insertion' ) {
      this.insertionSort();
    }

    else if ( this.props.sortName === 'bucket' ) {
      this.bucketSort();
    }

    else if ( this.props.sortName === 'radix' ) {
      this.radixSort();
    }

    else if ( this.props.sortName === 'merge' ) {
      this.mergeSort();
    }

    // if ( this.state.array !== [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30] && ) {
    //   this.resetArray();
    // }

  }


////////////////////////////////////////////////////////////////////////////////
// Bubble Sort /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
// Insertion Sort //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  insertionSort() {

    let array = this.state.arraySteps;

    let storeArr = [];

    for (let i = 0; i < array.length; i++) {

      const item = array[i];

      for (var j = i-1; j >= 0 && array[j] > item; j--) {
        array[j+1] = array[j];
      }

      array[j+1] = item;

      let tmp = [...array];

      storeArr.push(...[tmp]);

    }

    setTimeout(() => {

      for (let i = 0; i < storeArr.length; i++) {

        setTimeout(() => {

          this.setState({
            array: storeArr[i],
          })

        }, i * this.state.speed);

      };

      // while (this.state.isActive) {
      //
      //   console.log('testicles')
      //
      //     // setTimeout(() => {
      //     //
      //     //   this.setState({
      //     //     isActive: counter++,
      //     //   });
      //     //
      //     // }, 1000);
      //
      //   }

    }, 300);

    // console.log(storeArr);

  }

////////////////////////////////////////////////////////////////////////////////
// Bucket Sort /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  bucketSort() {

    let items = this.state.arraySteps;
    let bucketSize = 10;

    let arr0 = [];
    let arr1 = [];
    let arr2 = [];

// Insertion sort for within the buckets.

  const insertionSortBucket = (input, index) => {

    let storeArr = [];

    for (let i = 0; i < input.length; i++) {

      const item = input[i];

      for (var j = i-1; j >= 0 && input[j] > item; j--) {
        input[j+1] = input[j];
      }

      input[j+1] = item;

      let tmp = [...input];

      storeArr.push(...[tmp]);

    }

    setTimeout(() => {

      for (let i = 0; i < storeArr.length; i++) {

        setTimeout(() => {

          if (index === 0) {
            arr0 = storeArr[i];
          }

          else if (index === 1) {
            arr1 = storeArr[i];
          }

          else if (index === 2) {
            arr2 = storeArr[i];
          }

          this.setState({
            array: [...arr0, ...arr1, ...arr2],
          })

          if (i === (storeArr.length - 1)) {
            this.setState({
              isActive: false,
            });
          }

        }, i * this.state.speed * 6);

      };

    }, 500);

    return input;

  }


// Determin min and max values
    if(items.length === 0) { return items; }

    let min = Infinity, max = -Infinity;

    for (let i = 0; i < items.length; i++) {

      if (items[i] < min) {
        min = items[i]
      }

      if (items[i] > max) {
        max = items[i]
      }

    }

    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = new Array(bucketCount);

    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = [];
    }

    for (let i = 0; i < items.length; i++) {
      buckets[ Math.floor((items[i] - min) / bucketSize) ].push( items[i] );
    }

    items = [];
    for (let i = 0; i < buckets.length; i++) {

      buckets[i] = insertionSortBucket( buckets[i], i );
      items = items.concat( buckets[i] );

    }

  }


////////////////////////////////////////////////////////////////////////////////
// Radix Sort //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  radixSort() {

    let storeArr = [];

// Find largest number value's length to determine how many times the fn should run
    const largestNum = arr => {
      let largest = "0";

      arr.forEach(num => {
        const strNum = String(num);

        if (strNum.length > largest.length) largest = strNum;
      });
      return largest.length;
    };


// Retrieve numbers in the string values
    const getNum = (num, index) => {
      const strNum = String(num);
      let end = strNum.length - 1;
      const foundNum = strNum[end - index];
      if (foundNum === undefined) return 0;
      else return foundNum;
    };


// Radix sort
    let arr = this.state.array;

    let maxLength = largestNum(arr);

    for (let i = 0; i < maxLength; i++) {
      let buckets = Array.from({ length: 10 }, () => []);

      for (let j = 0; j < arr.length; j++) {
        let num = getNum(arr[j], i);

        if (num !== undefined) buckets[num].push(arr[j]);
      };
      arr = buckets.flat();

      console.log(buckets);

      let tmp = [...arr];

      storeArr.push(...[tmp]);

    };


    setTimeout(() => {

      for (let i = 0; i < storeArr.length; i++) {

        setTimeout(() => {

          this.setState({
            array: storeArr[i],
          })

          if (i === (storeArr.length - 1)) {
            this.setState({
              isActive: false,
            });
          }

        }, i * this.state.speed * 20);

      };

    }, 300);

  }


////////////////////////////////////////////////////////////////////////////////
// Merge Sort //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  // mergeSort() {
  //
  //   let array = this.state.array
  //
  //   const half = array.length / 2
  //
  //   // setTimeout(() => {
  //
  //     // Base case
  //     if(array.length < 2){
  //       return array
  //     }
  //
  //     const left = array.splice(0, half)
  //
  //     return this.merge(this.mergeSort(left),this.mergeSort(array));
  //
  //   // }, 1000);
  //
  // }
  //
  // merge(left, right) {
  //   let arr = []
  //   // Break out of loop if any one of the array gets empty
  //   while (left.length && right.length) {
  //       // Pick the smaller among the smallest element of left and right sub arrays
  //       if (left[0] < right[0]) {
  //           arr.push(left.shift())
  //       } else {
  //           arr.push(right.shift())
  //       }
  //   }
  //
  //   this.setState({
  //     array: [ ...arr, ...left, ...right ]
  //   })
  //   // Concatenating the leftover elements
  //   // (in case we didn't go through the entire left or right array)
  //   return [ ...arr, ...left, ...right ]
  // }

  mergeSort() {

    this.setState({
      array: mergeSortV(this.state.array)
    })

  }


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

////////////////////////////////////////////////////////////////////////////////
// Merge Sort //////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function mergeSortV(array) {

    const half = array.length / 2

    if(array.length < 2){
      return array
    }

    const left = array.splice(0, half)

    return merge(mergeSortV(left),mergeSortV(array))

}

function merge(left, right) {
    let arr = []

    while (left.length && right.length) {
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }

    return [ ...arr, ...left, ...right ]
}

export default SortingVisualizer;
