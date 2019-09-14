import { createSelector } from 'reselect'
import { filter, orderBy, indexOf, flow, reduce, round } from 'lodash'
import moment from 'moment'

const getTransactions = state => state.entities.transactions
const getCategories = state => state.entities.categories
const getAccounts = state => state.entities.accounts
const getTransactionsDateRange = state => state.entities.transactionsDateRange

const getAccountFilter = state => state.ui.accountFilter
const getCategoriesFilter = state => state.ui.categoriesFilter
const getDateFilter = state => state.ui.dateFilter
const getDateRangeFilter = state => state.ui.dateRangeFilter

const filterByAccount = (accountFilter, transactions) => {
  if (accountFilter) {
    return filter(transactions, {accountId:accountFilter})
  }
  return transactions
}

const filterByCategories = (categoriesFilter, transactions) => {
  if (categoriesFilter.length !== 0) {
    return filter(transactions, transaction => indexOf(categoriesFilter, transaction.category) !== -1)
  }
  return transactions
}

const filterByDate = (ascending, transactions) => {
  return orderBy(transactions, transaction => new moment(transaction.transactionDate).format('YYYY-MM-DD'), ascending ? 'asc' : 'desc')
}

const filterByDateRange = (dateRangeFilter, transactions) => {
  if (dateRangeFilter.start && dateRangeFilter.end) {
    return filter(transactions, transaction => {
      let date = moment(transaction.transactionDate, 'YYYY-MM-DD')
      let startDate = moment(dateRangeFilter.start, 'YYYY-MM-DD')
      let endDate = moment(dateRangeFilter.end, 'YYYY-MM-DD')
      return date.isBefore(endDate) && date.isAfter(startDate)
    })
  }
  return transactions
}

const getVisibleTransactions = createSelector(
  [ getAccountFilter, getCategoriesFilter, getDateFilter, getDateRangeFilter, getTransactions ],
  (accountFilter, categoriesFilter, dateFilter, dateRangeFilter, transactions) => {
    return flow(
      filterByAccount.bind(this, accountFilter),
      filterByCategories.bind(this, categoriesFilter),
      filterByDate.bind(this, dateFilter),
      filterByDateRange.bind(this, dateRangeFilter)
    )(transactions)
  }
)

const getTotal = (key) => (list) => {
  return round(reduce(list, (result, transaction) => {
    if (transaction[key]) return result + transaction.amount
    return result
  }, 0), 2)
}

const getTotalTransactions = createSelector(
  [ getVisibleTransactions ],
  (visibleTransactions) => {
    const withdrawal = getTotal('withdrawal')(visibleTransactions)
    const deposit = getTotal('deposit')(visibleTransactions)
    return {withdrawal, deposit}
  }
)

export {
  getTransactions,
  getCategories,
  getAccounts,
  getVisibleTransactions,
  getTransactionsDateRange,
  getAccountFilter,
  getCategoriesFilter,
  getDateFilter,
  getDateRangeFilter,
  getTotalTransactions
}
