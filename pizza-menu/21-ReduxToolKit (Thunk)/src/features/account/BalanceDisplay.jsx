import { useSelector } from "react-redux";
import { FormatCurrency } from '../currencyFormat'

function BalanceDisplay() {

  const loading = useSelector((state) => state.account.isLoading);


  const balanceDisplay = useSelector((store) => store.account.balance);

  return (
    <div className="balance">{loading ? "converting..." : <FormatCurrency value={balanceDisplay} />}</div>
  )
}

export default BalanceDisplay;
