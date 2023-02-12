import {useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import './App.css'
import MasterRoute from './components/MasterRoute'
import HomeRoute from './components/HomeRoute'
import StudentRoute from './components/StudentRoute'
import YoutellIdoContext from './YouTellIdoContext'
import LoginRoute from './components/LoginRoute'

const App = () => {
  const [user, setUser] = useState('')
  const [usersList, setUsersList] = useState([])
  const [whoIs, setWhoIs] = useState('')
  const [calcHistory, setCalcHistory] = useState([])

  const storeDataInLocalStorage = () => {
    const combineData = {user, usersList, whoIs, calcHistory}
    const stringifyData = JSON.stringify(combineData)
    localStorage.setItem('youTellIDoStore', stringifyData)
  }

  useEffect(() => {
    const retriveDataFromLocalStorage = () => {
      const data = localStorage.getItem('youTellIDoStore')
      if (data !== null) {
        const parsedData = JSON.parse(data)

        setUser(parsedData.user)
        setUsersList(parsedData.usersList)
        setCalcHistory(parsedData.calcHistory)
      }
    }
    retriveDataFromLocalStorage()
  }, [])

  const updateUserList = newUser => {
    setUsersList([...usersList, newUser])
    storeDataInLocalStorage()
  }

  const updateData = calc => {
    const updateHistory = usersList.map(eachUser => {
      if (eachUser.username === user.username) {
        return {...eachUser, history: [...eachUser.history, calc]}
      }
      return eachUser
    })
    setUsersList(updateHistory)
    storeDataInLocalStorage()
  }

  const setUserFn = userDets => {
    setUser(userDets)
    storeDataInLocalStorage()
  }

  const onLogout = () => {
    setUser({})
  }

  const onAddHistory = newCalc => {
    setCalcHistory([...calcHistory, newCalc])
    updateData(newCalc)
    setUser({...user, history: [...user.history, newCalc]})

    storeDataInLocalStorage()
  }

  const onClickWhoIs = data => {
    setWhoIs(data)
    storeDataInLocalStorage()
  }
  storeDataInLocalStorage()
  return (
    <YoutellIdoContext.Provider
      value={{
        whoIsDt: whoIs,
        setWhoIsFn: onClickWhoIs,
        currentUser: user,
        setCurrentUserFn: setUserFn,
        usersListDt: usersList,
        setUserListFn: updateUserList,
        calcHistoryDt: calcHistory,
        setCalcHistoryFn: onAddHistory,
        storeDataInLocalStorageFn: storeDataInLocalStorage,
        onLogoutFn: onLogout,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeRoute} />
          <Route exact path="/login" component={LoginRoute} />
          <Route exact path="/master" component={MasterRoute} />
          <Route exact path="/student" component={StudentRoute} />
        </Switch>
      </BrowserRouter>
    </YoutellIdoContext.Provider>
  )
}

export default App
