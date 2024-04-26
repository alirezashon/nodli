/** @format */

// const sma = require('technicalindicators').sma;
// var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
// var period = 10;
// console.log(sma({ period: period, values: prices }))

const { AwesomeOscillator } = require('technicalindicators')

// Sample historical price data
const data = {
	open: [31.1, 26.18, 27.47],
	high: [31.8, 26.91, 30.94],
	close: [28.1, 26.18, 30.62],
	low: [27.5, 25.4, 27.03],
}

// Parameters for the Awesome Oscillator (AO)
const fastPeriod = 5
const slowPeriod = 34

// Calculate the Awesome Oscillator
const ao = new AwesomeOscillator({
	high: data.high,
	low: data.low,
	fastPeriod,
	slowPeriod,
})
const result = ao.getResult()

// Log the input data and parameters
console.log('Input data:')
console.table(data)
console.log('Parameters:')
console.log('Fast Period:', fastPeriod)
console.log('Slow Period:', slowPeriod)

// Log the result
console.log('Awesome Oscillator (AO) values:')
console.table(result)


// const AbandonedBaby = require('technicalindicators').abandonedbaby
// var threeDayInput = {
// 	open: [31.10,26.18,27.47],
// 	high: [31.80,26.91,30.94],
// 	close: [28.10,26.18,30.62],
// 	low: [27.50,25.40,27.03]
// }
// var result = AbandonedBaby(threeDayInput);
// console.log('Is Abandoned Baby : '+ result);
