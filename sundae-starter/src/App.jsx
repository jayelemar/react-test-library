import { Container } from "react-bootstrap"
import OrderEntry from "./pages/entry/OrderEntry"
import { OrderDetailsProvider } from "./context/OrderDetail"

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
