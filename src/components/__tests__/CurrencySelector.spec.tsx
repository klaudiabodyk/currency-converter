import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {render, screen, waitFor,} from '@testing-library/react';
import CurrencySelector from "../CurrencySelector";
import {sampleCurrencyResponse} from "./mockData/mockData";
import {userEvent} from "@testing-library/user-event";

describe('Currency Selector tests', () => {
    afterEach(() => {
        mock.reset();
    });
const mock = new MockAdapter(axios);
    it('should render CurrencySelector component', async () => {
        //arrange
        render(<CurrencySelector currencies={sampleCurrencyResponse} selectedCurrency={""} onCurrencyChange={jest.fn()} />)
        const currencySelector = screen.getByTestId('currency-selector-secondary');
        const currencyShortCodeAED = screen.getByTestId('currency-option-AED');
        const currencyShortCodeBND = screen.getByTestId('currency-option-BND');
        //verify
        expect(currencySelector).toBeInTheDocument()
        expect(currencyShortCodeAED).toBeInTheDocument()
        expect(currencyShortCodeBND).toBeInTheDocument()
    })
    it('should select an currency option', async () => {
        //arrange
        const mockOnCurrencyChange = jest.fn();
        render(<CurrencySelector currencies={sampleCurrencyResponse} selectedCurrency={""} onCurrencyChange={mockOnCurrencyChange} />)
        const currencySelector = screen.getByTestId('currency-selector-secondary');
        //act
        const event = userEvent.setup();
        await event.selectOptions(currencySelector, 'AED');
        //verify
        await waitFor(() => {
            expect(mockOnCurrencyChange).toHaveBeenCalledWith('AED');
        });
        expect(screen.getByText(/AED/i)).toBeInTheDocument();

    });
})