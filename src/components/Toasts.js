import React, { useState } from 'react';

function Toasts(props) {

  return (
    <div className="toast">
      <p>{props.toast}</p>
    </div>
  );
}

export default Toasts;
