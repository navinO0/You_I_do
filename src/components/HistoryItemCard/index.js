import './index.css'

const HistoryItemCard = props => {
  const {eachCalc} = props
  const {studentusername, firstNum, secondNum, oparation, results} = eachCalc
  return (
    <li className="history-item-main-li-container">
      <p className="label-history">
        asked by : <span>{studentusername}</span>
      </p>
      <div className="card-history-li-item-container">
        <p className="details-li-item">{firstNum}</p>
        <p className="details-li-item">{oparation}</p>
        <p className="details-li-item">{secondNum}</p>

        <p className="details-li-item">=</p>
        <p className="details-li-item">{results}</p>
      </div>
    </li>
  )
}

export default HistoryItemCard
