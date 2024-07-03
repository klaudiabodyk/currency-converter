import axios from 'axios';

/**
 * Interface representing the response structure for currencies.
 */
export interface CurrencyResponse {
    data: {
        [key: string]: string;
    };
}

const API_KEY = 'NHKNUhI53ZApF4IXCOX1DpUj2YTSl2U1';
const BASE_URL = 'https://api.currencybeacon.com/v1';

/**
 * CurrencyService class provides methods to interact with currency-related APIs.
 */
class CurrencyService {
    /**
     * Fetches the list of available currencies from the API.
     * @returns Promise<CurrencyResponse> A promise that resolves to the list of currencies.
     * or throw an error if the API call fails.
     */
    static async getCurrencies(): Promise<CurrencyResponse> {
        try {
            const response = await axios.get(`${BASE_URL}/currencies?api_key=${API_KEY}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch currencies:', error);
            throw error;
        }
    }

    /**
     * Converts an amount from one currency to another using the API.
     * @param fromCurrency - The currency code to convert from.
     * @param toCurrency - The currency code to convert to.
     * @param amount - The amount to convert.
     * @returns Promise<number> A promise that resolves to the converted amount.
     * or throw an error if the API call fails.
     */
    static async convertCurrency(fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
        try {
            const response = await axios.get(`${BASE_URL}/convert`, {
                params: {
                    api_key: API_KEY,
                    from: fromCurrency,
                    to: toCurrency,
                    amount
                }
            });
            return response.data.value;
        } catch (error) {
            console.error('Failed to convert currency:', error);
            throw error;
        }
    }
}
export default CurrencyService;
