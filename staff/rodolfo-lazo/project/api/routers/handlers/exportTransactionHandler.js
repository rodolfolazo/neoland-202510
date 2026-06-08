import ExcelJS from 'exceljs'

import { logic } from '../../logic/index.js'

export function exportTransactionsHandler(req, res, next) {
  try {
    const { userId } = req

    logic
      .getTransactions(userId)
      .then((transactions) => {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Transactions')

        worksheet.columns = [
          { header: 'Date', key: 'executedAt', width: 20 },
          { header: 'Symbol', key: 'symbol', width: 15 },
          { header: 'Type', key: 'type', width: 10 },
          { header: 'Quantity', key: 'quantity', width: 15 },
          { header: 'Price', key: 'price', width: 15 },
          { header: 'Value', key: 'value', width: 15 },
        ]

        transactions.forEach((tx) => {
          worksheet.addRow({
            executedAt: tx.executedAt,
            symbol: tx.symbol,
            type: tx.type,
            quantity: tx.quantity,
            price: tx.price,
            value: tx.value,
          })
        })

        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )

        res.setHeader(
          'Content-Disposition',
          `attachment; filename=transactions-${userId}.xlsx`,
        )

        return workbook.xlsx.write(res)
      })
      .then(() => {
        res.end()
      })
      .catch(next)
  } catch (error) {
    next(error)
  }
}
