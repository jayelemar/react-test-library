import axios from "axios"
import { useEffect, useState } from "react"
import ScoopOption from "./ScoopOption"
import ToppingsOption from "./ToppingsOption"
import { Row } from "react-bootstrap"
import AlertBanner from "../common/AlertBanner"
import { pricePerItem } from "../../constants"
import { formatCurrency } from "../../utils"
import { useOrderDetails } from "../../context/OrderDetail"

export default function Options({ optionType }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)

  const { totals, updateItemCount } = useOrderDetails()

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => setError(true))
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingsOption
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={updateItemCount} // Pass the function here
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType] || 0)}
      </p>

      <Row>{optionItems}</Row>
    </>
  )
}
