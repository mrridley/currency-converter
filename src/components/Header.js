import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    const changeCurrencyHandler = (event) => {
        props.setCurrency(event.target.value);
    };

    return (
        <header>
            <nav>
                <nav>
                    <NavLink  to="/">Home</NavLink >
                    <NavLink  to="/convert">Converter</NavLink >
                </nav>
                <select value={props.currency} onChange={changeCurrencyHandler}>
                    {props.currencyList.map((el) => (
                            <option key={el + '_base'} value={el}>{el.toUpperCase()}</option>
                        )
                    )}
                </select>
            </nav>
        </header>
    );
}

export default Header;
