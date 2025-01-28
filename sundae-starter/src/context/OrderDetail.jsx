import { createContext, useContext, useMemo, useState } from "react"
import { pricePerItem } from "../constants"

const OrderDetails = createContext()

// create a custom hook to check if we are in a provider
// eslint-disable-next-line react-refresh/only-export-components
export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails)

  if (!contextValue) {
    throw new Error("useOrderDetails must be called from within an OrderDetailsProvider")
  }

  return contextValue
}

//Create a provider
export const OrderDetailsProvider = (props) => {
  //Create states for the options
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // example: { Chocolate: 1, Vanilla: 2 }
    toppings: {},
  })

  const updateItemCount = (itemName, newItemCount, optionType) => {
    // make a copy of existing state
    const newOptionCounts = { ...optionCounts }

    //update the copy with the new information
    newOptionCounts[optionType][itemName] = newItemCount

    //set  the state with the updated copy
    setOptionCounts(newOptionCounts)
  }

  const resetOrder = () => {
    setOptionCounts({
      scoops: {},
      toppings: {},
    })
  }

  //utility function to derive totals from optionCounts state value
  const calculateTotal = (optionType) => {
    // get an array of counts for the option type (example: [1, 2])
    const countsArray = Object.values(optionCounts[optionType])

    // total  the value in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0)

    // multiply the total number of items by the price for this item type
    return totalCount * pricePerItem[optionType]
  }
  // Memoized total calculation for scoops and toppings
  const totals = useMemo(() => {
    const calculateTotal = (optionType) => {
      const countsArray = Object.values(optionCounts[optionType])
      const totalCount = countsArray.reduce((total, value) => total + value, 0)
      return totalCount * pricePerItem[optionType]
    }

    return {
      scoops: calculateTotal("scoops"),
      toppings: calculateTotal("toppings"),
    }
  }, [optionCounts]) // Recalculate when optionCounts changes

  const value = { optionCounts, totals, updateItemCount, resetOrder }
  return <OrderDetails.Provider value={value} {...props}></OrderDetails.Provider>
}
