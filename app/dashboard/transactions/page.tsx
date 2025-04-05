import Transactiondata from '@/components/transactions/transaction-data'
import React from 'react'

const TransactionsPage = () => {
  return (
    <div className='px-4 lg:px-6'>
        <div className='flex justify-between pb-5'>
            <h2 className='font-bold text-xl'>Transactions</h2>
        </div>
        <Transactiondata />
    </div>
  )
}

export default TransactionsPage