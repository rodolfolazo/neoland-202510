import { data, PortfolioData } from '../../data/index.js'

export function rebuildPortfolio(userId) {
  const portfolioMap = new Map()

  return data.findTransactionsByUserId(userId).then((transactionsData) => {
    transactionsData
      .sort((a, b) => {
        const executedAtDiff = new Date(a.executedAt) - new Date(b.executedAt)

        if (executedAtDiff !== 0) return executedAtDiff

        return a.id.localeCompare(b.id)
      })
      .forEach((transactionData) => {
        const current = portfolioMap.get(transactionData.symbol) || 0

        const delta =
          transactionData.type === 'BUY'
            ? transactionData.quantity
            : -transactionData.quantity

        portfolioMap.set(transactionData.symbol, current + delta)
      })

    const portfolio = []

    portfolioMap.forEach((quantity, symbol) => {
      if (quantity <= 0) return

      portfolio.push(new PortfolioData(null, userId, symbol, quantity))
    })

    return data.replacePortfolio(userId, portfolio)
  })
}
