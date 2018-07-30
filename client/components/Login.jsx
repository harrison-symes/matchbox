import React from 'react'
import {connect} from 'react-redux'

import {
  loginUser,
  loginError
} from '../actions/login'

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: '',
      password: ''
    }
    this.updateDetails = this.updateDetails.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentDidMount = () => {
    this.props.loginError('')
  }
  updateDetails = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  submit(e) {
    e.preventDefault()
    console.log("login");
    const {user_name, password} = this.state
    this.props.login({user_name, password}, (err) => {
      if (!err) this.props.history.push('/')
      else this.setState({password: ''})
    })
  }
  render() {
    const {auth} = this.props
    return (
      <form className="form box" onSubmit={this.submit}>
        <h1 className="title is-2">Login</h1>
        <hr />
        <div className="columns">
          <button className="button is-large is-success is-fullwidth" onClick={() => this.props.loginSpecific('good')}>Good</button>
          <button className="button is-large is-danger is-fullwidth" onClick={() => this.props.loginSpecific('bad')}>Bad</button>
        </div>
        {auth.errorMessage && <span className="has-text-danger is-large">{auth.errorMessage}</span>}
        <label className="label is-large has-text-centered">Username
          <input required className="input has-text-centered is-large is-fullwidth" placeholder="User Name" type="text" name="user_name" onChange={this.updateDetails}/>
        </label>
        <label className="label is-large has-text-centered">Password
          <input required className="input has-text-centered is-large is-fullwidth" placeholder="Password" type="password" name="password" onChange={this.updateDetails}/>
        </label>
        <input className="button is-large is-fullwidth is-success" value='Login' type="submit" />
      </form>
    )
  }
}

const mapStateToProps = ({auth}) => ({auth})

const mapDispatchToProps = dispatch => ({
    login: (creds, cb) => dispatch(loginUser(creds, cb)),
    loginError: message => dispatch(loginError(message)),
    loginSpecific: user_name => dispatch(loginUser({user_name, password: user_name}))
  })

export default connect(mapStateToProps, mapDispatchToProps)(Login)
