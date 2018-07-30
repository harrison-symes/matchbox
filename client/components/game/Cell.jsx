import React from 'react'
import {connect} from 'react-redux'

class Cell extends React.Component {
  render() {
    const {cell} = this.props
    const cubeStyle = {
      width: '8vh',
      height: '8vh',
      backgroundColor: 'grey',
      border: '1px solid black'
    }
    return <div style={cubeStyle}>
      <i className={`icon ra ${cell.inPosition ? cell.inPosition.icon : 'ra-grass'} ra-2x`} />
    </div>
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Cell)
