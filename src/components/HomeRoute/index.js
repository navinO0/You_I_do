import {Redirect} from 'react-router-dom'
import YouTellIdoContext from '../../YouTellIdoContext'
import './index.css'

const HomeRoute = props => (
  <YouTellIdoContext.Consumer>
    {value => {
      const {setWhoIsFn, currentUser} = value
      const {history} = props
      const onClickMaster = () => {
        setWhoIsFn('MASTER')
        history.push('/login')
      }
      const onClickStudent = () => {
        setWhoIsFn('STUDENT')
        history.push('/login')
      }

      if (currentUser.username !== undefined) {
        if (currentUser.whoIsDt === 'MASTER') {
          return <Redirect to="/master" />
        }
        return <Redirect to="/student" />
      }

      return (
        <div className="home-main-container">
          <h1 className="home-main-heading">You Tell, I Do</h1>
          <div className="buttons-container">
            <button type="button" className="home-btn" onClick={onClickMaster}>
              <img
                src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1676122989/4630062_q8ukum.jpg"
                className="home-master-student"
                alt="master"
              />
            </button>
            <button type="button" className="home-btn" onClick={onClickStudent}>
              <img
                src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1676123347/depositphotos_308779296-stock-illustration-cute-kid-teen-boy-show_cvqwdf.jpg"
                className="home-master-student"
                alt="student"
              />
            </button>
          </div>
        </div>
      )
    }}
  </YouTellIdoContext.Consumer>
)

export default HomeRoute
