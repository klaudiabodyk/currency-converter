import {amount, fromCurrency, mockData, sampleCurrencyResponse, toCurrency} from "./mockData/mockData";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {render, screen} from '@testing-library/react';
import {userEvent} from "@testing-library/user-event";
import CurrencyConverter from "../CurrencyConverter";

const mock = new MockAdapter(axios);
describe('Currency Converter tests', () => {
    afterEach(() => {
        mock.reset();
    });
    it('should render CurrencyConverter component',() => {
        mock.onGet(`https://api.currencybeacon.com/v1/currencies?api_key=NHKNUhI53ZApF4IXCOX1DpUj2YTSl2U1`).reply(200, sampleCurrencyResponse);
        //arrange
        render(<CurrencyConverter />)
        const currencyConverter = screen.getByTestId('currency-converter');
        const currencyInput = screen.getByTestId('currency-input-from');
        const currencyDisabledInput = screen.getByTestId('currency-input-disabled-to');
        //verify
        expect(currencyConverter).toBeInTheDocument()
        expect(currencyInput).toBeInTheDocument()
        expect(currencyDisabledInput).toBeInTheDocument()
    })
});
