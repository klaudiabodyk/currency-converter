import React from 'react';
import _ from "lodash";
import {shortCodeField} from "../config/currencyConfig";
export interface Currency {
    id: number,
    name: string,
    short_code: string,
    code: string,
    precision: number,
    subunit: number,
    symbol: string,
    symbol_first: boolean,
    decimal_mark: string,
    thousands_separator: string
}
interface CurrencySelectorProps {
    currencies: { [key: string]: Currency };
    selectedCurrency: string;
    onCurrencyChange: (currency: string) => void;
    isPrimary?: boolean
}
/**
*CurrencySelector is a React component that renders a dropdown menu for selecting a currency.* It uses lodash's map function to transform the received data into a format suitable for rendering options.
* @param currencies - Data used to generate the dropdown options.
* @param selectedCurrency - The currently selected currency code.
* @param onCurrencyChange - Callback function triggered when the selected currency changes.
**/
const CurrencySelector = ({ currencies, selectedCurrency, onCurrencyChange, isPrimary }: CurrencySelectorProps) => {
    const shortCodes = _.map(currencies, shortCodeField) as string[];

    return (
        <select data-testid={`currency-selector-${isPrimary ? "primary" : "secondary"}`} value={selectedCurrency} onChange={(e) => onCurrencyChange(e.target.value)}>
            <option value="" disabled>Select currency</option>
            {shortCodes.map((currencyCode:string, index: number) => (
                <option data-testid={`currency-option-${currencyCode}`} key={index} value={currencyCode}>{currencyCode}</option>
            ))}
        </select>
    );
};
export default CurrencySelector;
