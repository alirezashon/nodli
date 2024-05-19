async function fetchBinanceData(symbol, interval, limit) {
//   const symbol = "EPXUSDT"
//   const interval = "15m"
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
  const response = await fetch(url,{})
  const responseData = await response.json()
  console.log(responseData)
  return responseData.map((item) => ({
    openTime: item[0],
    open: item[1],
    high: item[2],
    low: item[3],
    close: item[4],
    volume: item[5],
    closeTime: item[6],
    quoteAssetVolume: item[7],
    numberOfTrades: item[8],
    takerBuyBaseAssetVolume: item[9],
    takerBuyQuoteAssetVolume: item[10],
    ignore: item[11],
  }))
}

// Simple Moving Average (SMA)
function calculateSMA(data, period) {
  return data.slice(period - 1).map((_, index) => {
    const slice = data.slice(index, index + period)
    const sum = slice.reduce((acc, cur) => acc + parseFloat(cur.close), 0)
    return sum / period
  })
}

// Relative Strength Index (RSI)
function calculateRSI(data, period) {
  let gains = 0
  let losses = 0
  const rsiData = []

  for (let i = 1; i < data.length; i++) {
    const difference = parseFloat(data[i].close) - parseFloat(data[i - 1].close)
    if (difference >= 0) {
      gains += difference
    } else {
      losses -= difference
    }

    if (i >= period) {
      const averageGain = gains / period
      const averageLoss = losses / period
      const rs = averageGain / averageLoss
      const rsi = 100 - 100 / (1 + rs)
      rsiData.push(rsi)

      const previousDifference =
        parseFloat(data[i - period + 1].close) -
        parseFloat(data[i - period].close)
      if (previousDifference >= 0) {
        gains -= previousDifference
      } else {
        losses += previousDifference
      }
    }
  }
  return rsiData
}

// Bollinger Bands
function calculateBollingerBands(data, period, multiplier) {
  const sma = calculateSMA(data, period)
  return sma.map((smaValue, index) => {
    const slice = data.slice(index, index + period)
    const stdDev = Math.sqrt(
      slice.reduce(
        (acc, cur) => acc + Math.pow(parseFloat(cur.close) - smaValue, 2),
        0
      ) / period
    )
    return {
      upperBand: smaValue + multiplier * stdDev,
      lowerBand: smaValue - multiplier * stdDev,
      middleBand: smaValue,
    }
  })
}

// Main function to fetch data and calculate indicators
async function analyzeData(symbol, interval, limit, period) {
  const data = await fetchBinanceData(symbol, interval, limit)

  const sma = calculateSMA(data, period)
  const rsi = calculateRSI(data, period)
  const bollingerBands = calculateBollingerBands(data, period, 2)

  return { sma, rsi, bollingerBands }
}

// Example usage
analyzeData("BTCUSDT", "1d", 100, 14).then((result) => {
  console.log("SMA:", result.sma)
  console.log("RSI:", result.rsi)
  console.log("Bollinger Bands:", result.bollingerBands)
})
