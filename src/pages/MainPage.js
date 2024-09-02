import './MainPage.css';

const MainPage = (props) => {

    const isEmpty = Object.keys(props.rates).length === 0;

    return (
        <div>
            <ul>
                {isEmpty ? (
                    <div>Loading...</div>
                ) : (
                    props.currencyList.map( (el) => (
                            el !== props.currency && (
                                <li key={el}>
                                    1 {el} = {props.rates[el + '-' + props.currency].toFixed(2)} {props.currency}
                                </li>
                            )
                        ))
                    )
                }

            </ul>
        </div>
    );
}

export default MainPage;
