import './App.css';
import Header from "./components/Header";
import ConverterPage from "./pages/ConverterPage";
import MainPage from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, {useEffect, useMemo, useState} from 'react';

const App = () => {
  const [currency, setCurrency] = useState('rub');
  const currencyList = useMemo(()=> ['rub', 'usd', 'eur'],[]);

  const [rates, setRates]  = useState({});

  useEffect(() => {
    fetch(`https://status.neuralgeneration.com/api/currency`)
        .then(response => response.json())
        .then((data) => {
          const filtered = Object.entries(data).filter(([pair, rate]) => {
            const [from, to] = pair.split('-');
            return currencyList.includes(from) && currencyList.includes(to);
          })
          setRates(Object.fromEntries(filtered));
        });
  }, [currency, currencyList]);

  return (
      <div className="App">
        <BrowserRouter>
          <Header currencyList={currencyList} currency={currency} setCurrency={setCurrency} />
          <div className="content">
              <Routes>
                <Route path="/" element={<MainPage rates={rates} currencyList={currencyList} currency={currency} />} />
                <Route path="/convert" element={<ConverterPage rates={rates} currencyList={currencyList} currency={currency} />} />
              </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
