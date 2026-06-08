export class Transaction {
  constructor(
    id,
    userId,
    symbol,
    type,
    quantity,
    price,
    value,
    executedAt,
    balanceAfter,
  ) {
    this.id = id
    this.userId = userId
    this.symbol = symbol
    this.type = type
    this.quantity = quantity
    this.price = price
    this.value = value
    this.executedAt = executedAt
    this.balanceAfter = balanceAfter
  }
}
