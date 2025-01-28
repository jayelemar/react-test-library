import { Col, Form, Row } from "react-bootstrap"
import { useOrderDetails } from "../../context/OrderDetail"

export default function ScoopOption({ name, imagePath }) {
  const { optionCounts, updateItemCount } = useOrderDetails()

  // Retrieve the current item count from the global state
  const currentCount = optionCounts.scoops[name] || 0

  const handleChange = (e) => {
    updateItemCount(name, Number(e.target.value), "scoops")
  }

  return (
    <Col xs={12} sm={6} md={4} style={{ textAlign: "center" }}>
      <img style={{ width: "75%" }} src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <Form.Group controlId={`${name}-count`} as={Row} style={{ marginTop: "10px" }}>
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            value={currentCount} // Use value instead of defaultValue
            onChange={handleChange}
            min="0"
          />
        </Col>
      </Form.Group>
    </Col>
  )
}
