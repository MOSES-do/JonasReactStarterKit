import { useSelector } from "react-redux";
import { FormatCurrency } from '../currencyFormat'

function BalanceDisplay() {
  // const currency = useSelector((state) => state.account.currency);
  // const trimCurrency = currency.currency;
  // const convertedCurrency = trimCurrency === undefined ? currency : currency.currency

  // const formatCurrency = function formatCurrency(value) {
  //   const cur = convertedCurrency
  //   return new Intl.NumberFormat("en", {
  //     style: "currency",
  //     currency: cur,
  //   }).format(value);
  // }



  const balanceDisplay = useSelector((store) => store.account.balance);

  return (
    <div className="balance">{<FormatCurrency value={balanceDisplay} />}</div>
  )
}

export default BalanceDisplay;
