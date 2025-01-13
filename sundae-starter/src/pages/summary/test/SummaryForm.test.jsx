import { render, screen } from "@testing-library/react"
import SummaryForm from "../SummaryForm"
import userEvent from "@testing-library/user-event"

test("Initial conditions", () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  })
  expect(checkbox).not.toBeChecked()

  const confirmButton = screen.getByRole("button", { name: /confirm order/i })
  expect(confirmButton).toBeDisabled()
})

test("Checkbox enables button on first click and disables on the second click", async () => {
  render(<SummaryForm />)
  const user = userEvent.setup()

  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i })
  const confirmButton = screen.getByRole("button", { name: /confirm order/i })

  await user.click(checkbox)
  expect(confirmButton).toBeEnabled()

  await user.click(checkbox)
  expect(confirmButton).toBeDisabled()
})

test("popover responds to hover", async () => {
  render(<SummaryForm />)

  const user = userEvent.setup()

  //popover initially hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument()

  //popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  await user.hover(termsAndConditions)

  const popover = await screen.findByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()

  //popover disappear when we mouse out
  await user.unhover(termsAndConditions)
  expect(popover).not.toBeInTheDocument()
})
