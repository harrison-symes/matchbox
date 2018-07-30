import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../actions/logout'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showBurger: false
    }
  }

  toggleBurger = () => this.setState({
    showBurger: !this.state.showBurger
  })

  render = () => {
    const {auth, logout} = this.props
    const {showBurger} = this.state
    return <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <span onClick={this.toggleBurger} className={`navbar-burger burger ${showBurger ? 'is-active': ''}`} data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroA" className={`navbar-menu ${showBurger ? "is-active" : ''}`}>
          <div className="navbar-end">
            {auth.user && <p className="navbar-item">{auth.user.user_name}</p>}
            {auth.isAuthenticated
              ? <Link to="/" onClick={this.props.logout} className="navbar-item is-large">Logout</Link>
              : <React.Fragment>
                <Link onClick={this.toggleBurger} className="navbar-item is-large" to='/login'>Login</Link>
                <Link onClick={this.toggleBurger} className="navbar-item" to='/register'>Register</Link>
              </React.Fragment>
            }
          </div>
        </div>
      </div>
    </nav>
  }
}

const
  mapStateToProps = ({auth}) => ({auth}),
  mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
  })

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
