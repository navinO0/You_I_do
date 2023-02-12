import React from 'react'

const YouTellIdoContext = React.createContext({
  currentUser: {},
  setCurrentUserFn: () => {},
  usersListDt: [],
  setUserListFn: () => {},
  whoIsDt: '',
  setWhoIsFn: () => {},
  calcHistoryDt: [],
  setCalcHistoryFn: () => {},
  storeDataInLocalStorageFn: () => {},
  onLogoutFn: () => {},
})

export default YouTellIdoContext
