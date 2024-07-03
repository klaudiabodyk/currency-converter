import {Currency} from "../../CurrencySelector";
export const fromCurrency = 'AED';
export const toCurrency = 'BND';
export const amount = 100;
export const sampleConvertedResponse = { value: 85 };
export const sampleCurrencyResponse: { [key: string]: Currency } = {
    "1":{
        id: 1,
        name: "UAE Dirham",
        short_code: "AED",
        code: "784",
        precision: 2,
        subunit: 100,
        symbol: "د.إ",
        symbol_first: true,
        decimal_mark: ".",
        thousands_separator: ","
    },
    "2":{
        id: 18,
        name: "Brunei Dollar",
        short_code: "BND",
        code: "96",
        precision: 2,
        subunit: 100,
        symbol: "$",
        symbol_first: true,
        decimal_mark: ".",
        thousands_separator: ","
    }
};