import {Redirect} from 'react-router-dom'
import YouTellIdoContext from '../../YouTellIdoContext'

import HistoryItemCard from '../HistoryItemCard'

import './index.css'

const MasterRoute = () => (
  <YouTellIdoContext.Consumer>
    {value => {
      const {calcHistoryDt, currentUser, onLogoutFn} = value
      const onClickLogoutBtn = () => {
        onLogoutFn()
      }
      if (currentUser.username === undefined) {
        return <Redirect to="/" />
      }
      return (
        <div className="student-route-main-container">
          <div className="heading-img-container">
            <div className="heading-inp-container">
              <div className="greet-logout-container">
                <h1 className="greet-heading">
                  Welcome{' '}
                  <span className="user-name">{currentUser.username}</span>
                </h1>
                <button
                  type="button"
                  onClick={onClickLogoutBtn}
                  className="calculate-btn"
                >
                  LogOut
                </button>
              </div>
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1676122989/4630062_q8ukum.jpg"
                className="math-image"
                alt="welcome"
              />
            </div>
          </div>
          <h1 className="greet-heading">Solved History</h1>
          <div className="history-cards-container">
            <ul className="history-ul-container">
              {calcHistoryDt.map(eachCalc => (
                <HistoryItemCard key={eachCalc.id} eachCalc={eachCalc} />
              ))}
            </ul>
          </div>
        </div>
      )
    }}
  </YouTellIdoContext.Consumer>
)

export default MasterRoute
