import {Redirect} from 'react-router-dom'
import SolveCard from '../SolveCard'
import YouTellIdoContext from '../../YouTellIdoContext'
import HistoryItemCard from '../HistoryItemCard'
import './index.css'

const StudentRoute = () => (
  <YouTellIdoContext.Consumer>
    {value => {
      const {calcHistoryDt, currentUser, onLogoutFn} = value
      const filteredcalcHistory = calcHistoryDt.filter(
        each => each.studentusername === currentUser.username,
      )

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
              <SolveCard />
            </div>
            <div>
              <img
                src="https://res.cloudinary.com/dzapdxkgc/image/upload/v1676136756/tiny-students-with-huge-sign-pi-flat-vector-illustration-boy-girl-studying-math-algebra-school-college-holding-ruler-using-laptop-geometric-figures-background-education-concept_74855-23227_qe5rk7.avif"
                className="math-image"
                alt="welcome"
              />
            </div>
          </div>
          <h1 className="greet-heading">Asked History</h1>
          <div className="history-cards-container">
            <ul className="history-ul-container">
              {filteredcalcHistory.map(eachCalc => (
                <HistoryItemCard key={eachCalc.id} eachCalc={eachCalc} />
              ))}
            </ul>
          </div>
        </div>
      )
    }}
  </YouTellIdoContext.Consumer>
)

export default StudentRoute
