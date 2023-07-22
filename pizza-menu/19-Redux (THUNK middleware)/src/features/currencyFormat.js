import { useSelector } from "react-redux";

export const FormatCurrency = ({ value }) => {
    const currency = useSelector((state) => state.account.currency);
    const trimCurrency = currency.currency;
    const convertedCurrency = trimCurrency === undefined ? currency : currency.currency

    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: convertedCurrency,
    }).format(value);

}

