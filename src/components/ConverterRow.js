import './ConverterRow.css';
import React, {useEffect, useState} from "react";

const ConverterRow = (props) => {

    const [selectedCurrency, setSelectedCurrency] = useState(props.currency);
    const [amountValue, setAmountValue] = useState(props.amount);

    useEffect(() => {
        setSelectedCurrency(props.currency);
        setAmountValue(props.amount);
    }, [props.currency, props.amount]);

    const inputValueChangeHandler = (event) => {
        setAmountValue(event.target.value);
        props.onAmountChange(props.id, event.target.value);
    }

    const selectValueChangeHandler = (event) => {
        setSelectedCurrency(event.target.value);
        props.onCurrencyChange(props.id, selectedCurrency, event.target.value);
    }

    return (
        <div className='converter-row'>
            <input type='number' value={amountValue} onChange={inputValueChangeHandler}/>
            <select value={selectedCurrency} onChange={selectValueChangeHandler} >
                {props.currencyList.map((el) => (
                        <option key={el} value={el}>{el.toUpperCase()}</option>
                    )
                )}
            </select>
        </div>
    );
}

export default ConverterRow;
