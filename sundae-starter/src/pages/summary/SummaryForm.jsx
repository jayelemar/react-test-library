import { useState } from "react"
import { Button, Form, OverlayTrigger } from "react-bootstrap"
import Popover from "react-bootstrap/Popover"

export default function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false)
  const handleSubmit = () => {}
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  )
  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check type="checkbox" checked={isChecked} onChange={() => setIsChecked(event.target.checked)} label={checkboxLabel} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm Order
      </Button>
    </Form>
  )
}
