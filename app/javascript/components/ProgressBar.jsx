import React from "react"
import PropTypes from "prop-types"

class ProgressBar extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="progress">
          <div id='incomplete-progress' className='progress-bar'></div>
          <div id='complete-progress' className='progress-bar'></div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProgressBar
