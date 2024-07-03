import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import CurrencyService from "../currencyService";
import {sampleConvertedResponse, sampleCurrencyResponse} from "../../components/__tests__/mockData/mockData";

const mock = new MockAdapter(axios);
    describe('getCurrencies', () => {
    afterEach(() => {
        mock.reset();
    });
        it('should fetch the list of currencies successfully', async () => {
            mock.onGet(`https://api.currencybeacon.com/v1/currencies?api_key=NHKNUhI53ZApF4IXCOX1DpUj2YTSl2U1`).reply(200, sampleCurrencyResponse);
            const result = await CurrencyService.getCurrencies();
            expect(result).toEqual(sampleCurrencyResponse);
        });

        it('should throw an error if the API call fails', async () => {
            mock.onGet(`https://api.currencybeacon.com/v1/currencies?api_key=NHKNUhI53ZApF4IXCOX1DpUj2YTSl2U1`).reply(500);
            await expect(CurrencyService.getCurrencies()).rejects.toThrow('Request failed with status code 500');
        });
    });
    describe('convertCurrency', () => {
        afterEach(() => {
            mock.reset();
        });
        it('should convert currency successfully', async () => {
            const fromCurrency = 'USD';
            const toCurrency = 'INR';
            const amount = 1;
            mock.onGet(`https://api.currencybeacon.com/v1/convert`, {
                params: {
                    api_key: 'NHKNUhI53ZApF4IXCOX1DpUj2YTSl2U1',
                    from: fromCurrency,
                    to: toCurrency,
                    amount,
                },
            }).reply(200, sampleConvertedResponse);

            const result = await CurrencyService.convertCurrency(fromCurrency, toCurrency, amount);
            expect(result).toEqual(sampleConvertedResponse.value);
        });
        it('should throw an error if the API call fails', async () => {
            const fromCurrency = 'USD';
            const toCurrency = 'INR';
            const amount = 1;
            mock.onGet(`https://api.currencybeacon.com/v1/convert`, {
                params: {
                    api_key: 'NHKNUhI53ZApF4IXCOX1DpUj2YTSl2U1',
                    from: fromCurrency,
                    to: toCurrency,
                    amount,
                },
            }).reply(500);
            await expect(CurrencyService.convertCurrency(fromCurrency, toCurrency, amount)).rejects.toThrow('Request failed with status code 500');
        });
    });
