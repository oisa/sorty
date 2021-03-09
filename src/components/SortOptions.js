import React, { Component, useState } from 'react';

// Buttons
import BubbleIcon from '../assets/BubbleIcon';
import InsertionIcon from '../assets/InsertionIcon';
import BucketIcon from '../assets/BucketIcon';
import RadixIcon from '../assets/RadixIcon';

class SortOptions extends Component {
  constructor() {
    super();
    this.state = {
      active: '',
    }
  }


  toggleClass(menuOption) {

    this.setState({ active: menuOption });

  };


  render() {
    return (
      <div className='sort-options-nav'>
        <ul className='sort-list'>
          <li>
            <a className={this.state.active === 'bubble' ? 'active' : {}} href='#' onClick={ () => this.toggleClass('bubble') }>
              <BubbleIcon />
              Bubble
            </a>
          </li>
          <li>
            <a href='#'>
              <InsertionIcon />
              Insertion
            </a>
          </li>
          <li>
            <a href='#'>
              <BucketIcon />
              Bucket
            </a>
          </li>
          <li>
            <a href='#'>
              <RadixIcon />
              Radix
            </a>
          </li>
          <li>
            <a href='#'>
              <RadixIcon />
              Merge
            </a>
          </li>
          <li>
            <a href='#'>
              <RadixIcon />
              Quicksort
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default SortOptions;
