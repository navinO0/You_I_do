import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

import YouTellIdoContext from '../../YouTellIdoContext'

const LoginRoute = props => {
  const {history} = props

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onChangeUserName = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  return (
    <YouTellIdoContext.Consumer>
      {value => {
        const {
          whoIsDt,
          setUserListFn,
          storeDataInLocalStorageFn,
          setCurrentUserFn,
          usersListDt,
        } = value
        const onSubmitForm = event => {
          event.preventDefault()
          const userDets = {username, password, whoIsDt, history: []}
          const dbUserObj = usersListDt.find(
            eachUser => eachUser.username === username,
          )
          let checkPassword = false
          if (dbUserObj !== undefined) {
            checkPassword = dbUserObj.password === password
          }

          if (username === '') {
            setErrorMessage('Enter User Name')
          } else if (password === '') {
            setErrorMessage('Enter Password')
          } else if (!checkPassword && dbUserObj !== undefined) {
            setErrorMessage("Username and Password Didn' t match")
          } else {
            setUserListFn(userDets)
            setCurrentUserFn(userDets)
            storeDataInLocalStorageFn()
            history.replace(`/${whoIsDt.toLowerCase()}`)
          }
        }
        const loginImg =
          whoIsDt === 'MASTER'
            ? 'https://res.cloudinary.com/dzapdxkgc/image/upload/v1676122989/4630062_q8ukum.jpg'
            : 'https://res.cloudinary.com/dzapdxkgc/image/upload/v1676123347/depositphotos_308779296-stock-illustration-cute-kid-teen-boy-show_cvqwdf.jpg'
        if (whoIsDt === '') {
          return <Redirect to="/" />
        }
        return (
          <div className="login-main-container">
            <div className="login-image-container">
              <img src={loginImg} className="login-image" alt="login" />
            </div>
            <div className="form-main-container">
              <h1 className="greet-heading">
                Enter <span>{whoIsDt} Details</span>
              </h1>
              <form onSubmit={onSubmitForm}>
                <div className="login-credential-input-container">
                  <label htmlFor="username" className="label">
                    Username
                  </label>
                  <br />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={onChangeUserName}
                    className="input-Element"
                  />
                </div>
                <div className="login-credential-input-container">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <br />
                  <input
                    type="password"
                    id="password"
                    onChange={onChangePassword}
                    value={password}
                    className="input-Element"
                  />
                </div>
                <button type="submit" className="button-login">
                  login
                </button>
                <p className="error-message">{errorMessage}</p>
              </form>
            </div>
          </div>
        )
      }}
    </YouTellIdoContext.Consumer>
  )
}

export default LoginRoute
