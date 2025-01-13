// Options.test.jsx
import { render, screen } from "@testing-library/react"
import Options from "../Options"

test("displays image for each scoop option from the server", async () => {
  render(<Options optionType="scoops" />)

  // Find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  // Confirm alt text of images
  const altText = scoopImages.map((element) => element.alt) // Return alt text
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"])
})
