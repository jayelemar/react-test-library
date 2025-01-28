import SummaryForm from "./SummaryForm"
import { useOrderDetails } from "../../context/OrderDetail"
import { formatCurrency } from "../../utils"

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails()
  const scoopsArray = Object.entries(optionCounts.scoops) // ["chocolate", 2 ], ["chocolate", 1]
  const scoopList = scoopsArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ))

  const toppingsArray = Object.keys(optionCounts.toppings) // ["M&M", "Gummy Bears"]
  const toppingList = toppingsArray.map((key) => {
    return <li key={key}>(key)</li>
  })

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)} </h2>
      <ul>{scoopList}</ul>

      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </div>
  )
}
