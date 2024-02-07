'use client'
import React, {useState, useEffect} from 'react'
import TableList from 'ui/components/transactions/TableList'
import getAllTransactionsData from 'lib/data/fetchData'
const page = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const data = await getAllTransactionsData();
          setTransactions(data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };
  
      fetchTransactions();
    }, []);

  return (
    <div>

<TableList transactions={transactions}/>

    </div>
  )
}

export default page