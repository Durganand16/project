
// Predefined exchange rates (for demo purpose, you can connect to an API for real rates)
const exchangeRates = {
    USD: { USD: 1, INR: 83, EUR: 0.92, AUD: 1.49 },
    INR: { USD: 0.012, INR: 1, EUR: 0.011, AUD: 0.018 },
    EUR: { USD: 1.09, INR: 90, EUR: 1, AUD: 1.62 },
    AUD: { USD: 0.67, INR: 55, EUR: 0.62, AUD: 1 }
};

// Select DOM elements
const amountInput = document.querySelector('.amount input');
const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
const msg = document.querySelector('.msg');
const button = document.querySelector('button');

// Update flag images when currency changes
function updateFlags() {
    const fromFlag = document.querySelector('.from img');
    const toFlag = document.querySelector('.to img');
    fromFlag.src = `https://flagsapi.com/${getCountryCode(fromCurrency.value)}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${getCountryCode(toCurrency.value)}/flat/64.png`;
}

// Map currency to country code for flags
function getCountryCode(currency) {
    const countryMap = {
        USD: 'US',
        INR: 'IN',
        EUR: 'EU',
        AUD: 'AU'
    };
    return countryMap[currency];
}

// Calculate and display exchange result
function convertCurrency(e) {
    e.preventDefault();
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        msg.innerText = 'Please enter a valid amount';
        return;
    }
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const rate = exchangeRates[from][to];
    const convertedAmount = (amount * rate).toFixed(2);
    msg.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
}

// Event Listeners
fromCurrency.addEventListener('change', updateFlags);
toCurrency.addEventListener('change', updateFlags);
button.addEventListener('click', convertCurrency);

// Initial flag setup
updateFlags();
