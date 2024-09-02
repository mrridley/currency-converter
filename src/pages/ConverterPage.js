import './ConverterPage.css';
import ConverterRow from "../components/ConverterRow";
import React, {useState} from "react";

const ConverterPage = (props) => {

    const currentIndex = props.currencyList.indexOf(props.currency),
          nextCurrency = props.currencyList[(currentIndex + 1) % props.currencyList.length];

    const [rows, setRows] = useState([
        { id: 'row1', currency: props.currency, amount: 0 },
        { id: 'row2', currency: nextCurrency, amount: 0 }
    ]);

    const onCurrencyChangeHandler = (id, oldCurrency, newCurrency) => {

        setRows(prevRows => {
            let conflictingId = null;
            prevRows.forEach((el) => {
                if (el.id !== id && el.currency === newCurrency)
                    conflictingId = el.id
            });

            const updatedRows = prevRows.map(row =>
                row.id === id
                    ? { ...row, currency: newCurrency }
                    : ( row.id === conflictingId
                        ? { ...row, currency: oldCurrency }
                        : row)
            );

            const sourceRow = updatedRows.find(row => row.id === id);
            const sourceCurrency = sourceRow ? sourceRow.currency : '';
            const sourceAmount = sourceRow ? sourceRow.amount : 0;

            const updatedAmountRows = updatedRows.map(row => {
                if (row.id !== id) {
                    const rate = props.rates[`${sourceCurrency}-${row.currency}`];
                    const newAmount = (sourceAmount * rate).toFixed(2);
                    return { ...row, amount: parseFloat(newAmount) };
                }
                return row;
            });

            return updatedAmountRows;
        });
    };

    const onAmountChangeHandler = (id, newAmount) => {

        setRows(prevRows => {
            const updatedRows = prevRows.map(row =>
                row.id === id
                    ? { ...row, amount: newAmount }
                    : row
            );

            console.log(updatedRows);

            const updatedAmountRows = updatedRows.map(row => {
                const sourceRow = updatedRows.find(r => r.id === id);
                const sourceAmount = sourceRow ? sourceRow.amount : 0;
                const sourceCurrency = sourceRow ? sourceRow.currency : '';

                if (row.id !== id && sourceCurrency && row.currency) {
                    const rate = props.rates[`${sourceCurrency}-${row.currency}`];
                    const newAmount = (sourceAmount * rate).toFixed(2);
                    return { ...row, amount: parseFloat(newAmount) };
                }
                return row;
            });

            return updatedAmountRows;
        });
    };

    return (
        <div className='converter'>
            <form>
                {rows.map(row => (
                    <ConverterRow
                        key={row.id}
                        id={row.id}
                        currencyList={props.currencyList}
                        currency={row.currency}
                        amount={row.amount}
                        onCurrencyChange={onCurrencyChangeHandler}
                        onAmountChange={onAmountChangeHandler}
                    />
                ))}
            </form>

        </div>
    );
}

export default ConverterPage;
