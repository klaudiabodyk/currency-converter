import React, {useEffect, useState} from 'react';
import CurrencySelector from "./CurrencySelector";
import CurrencyService from "../services/currencyService";
import styles from '../components/styles/CurrencyConverter.module.css';
import {useTranslation} from "react-i18next";

/**
 * CurrencyConverter is a React functional component that allows users to convert currencies.
 * It utilizes the CurrencyService to fetch currency data and perform conversions.
 * Users can select a source currency, a target currency, and specify an amount to convert.
 * The component then displays the converted amount.
 */
const CurrencyConverter= () : JSX.Element => {
    const { t } = useTranslation();
    const [currencies, setCurrencies] = useState({});
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState<any>(null);

    /**
     * Effect hook that runs once when the component mounts.
     * Fetches the list of available currencies from the CurrencyService.
     */
    useEffect(() => {
        const fetchData = async () => {
            const currenciesData = await CurrencyService.getCurrencies();
            setCurrencies(currenciesData);
        };

        fetchData();
    }, []);

    /**
     * Effect hook that runs whenever the selected currencies or the amount changes.
     * Performs the currency conversion using the CurrencyService.
     */
    useEffect(() => {
        const fetchConversion = async () => {
            if (fromCurrency && toCurrency && amount) {
                const convertedValue = await CurrencyService.convertCurrency(fromCurrency, toCurrency, amount);
                setConvertedAmount(convertedValue);
            }
        };

        fetchConversion();
    }, [fromCurrency, toCurrency, amount]);

    return (
        <div data-testid={"currency-converter"} className={`${styles['currency-converter']}`}>
            <h1>{t('currencyConverter')}</h1>
                <div>
                    <label>
                        <input
                            data-testid={"currency-input-from"}
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                        />
                    </label>
                    <label>
                        <CurrencySelector
                            currencies={currencies}
                            selectedCurrency={fromCurrency}
                            onCurrencyChange={setFromCurrency}
                            isPrimary
                        />
                    </label>
                </div>
                <div>
                    <input
                        data-testid={"currency-input-disabled-to"}
                        disabled
                        value={convertedAmount}
                    />
                    <label>
                        <CurrencySelector
                            currencies={currencies}
                            selectedCurrency={toCurrency}
                            onCurrencyChange={setToCurrency}
                        />
                    </label>
                </div>
        </div>
    );
};

export default CurrencyConverter;