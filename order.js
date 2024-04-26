/** @format */

const fs = require('fs')

const createOrder = async (symbol, side, price, quantity) => {
	try {
		const response = await fetch('https://api.wallex.ir/v1/account/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': '8792|ExxMnTjrvnwDc4IYrE4yU9DWr7AIVgPg2mMCP0PB',
			},
			body: JSON.stringify({
				symbol: symbol,
				type: 'LIMIT',
				side: side,
				price: price,
				quantity: quantity,
			}),
		})

		const data = await response.json()
		console.log(data)

		const responseData = JSON.stringify(data, null, 2) // Convert data to JSON string with formatting
		fs.appendFileSync('response.txt', responseData + '\n') // Append response to text file with a new line
		console.log('Response written to response.txt')
	} catch (error) {
		console.error('Error:', error)
	}
}
// createOrder('XTZUSDT', 'SELL', '1.27', '12')

const deleteOrder = async (orderId) => {
	try {
		const response = await fetch(
			`https://api.wallex.ir/v1/account/orders?clientOrderId=${orderId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'X-API-Key': '8792|ExxMnTjrvnwDc4IYrE4yU9DWr7AIVgPg2mMCP0PB',
				},
			}
		)

		const data = await response.json()
		console.log(data)

		const responseData = JSON.stringify(data, null, 2) // Convert data to JSON string with formatting
		fs.appendFileSync('response.txt', responseData + '\n') // Append response to text file with a new line
		console.log('Response written to response.txt')
	} catch (error) {
		console.error('Error:', error)
	}
}
 
const getOrders = async () => {
	try {
		const response = await fetch(
			'https://api.wallex.ir/v1/account/openOrders',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-API-Key': '8792|ExxMnTjrvnwDc4IYrE4yU9DWr7AIVgPg2mMCP0PB',
				},
			}
		)

		const data = await response.json()
		console.log(data)

		const responseData = JSON.stringify(data, null, 2) // Convert data to JSON string with formatting
		fs.appendFileSync('response.txt', responseData + '\n') // Append response to text file with a new line
		console.log('Response written to response.txt')
	} catch (error) {
		console.error('Error:', error)
	}
}
getOrders()



