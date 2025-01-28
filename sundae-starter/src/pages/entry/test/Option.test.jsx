// Options.test.jsx
import { render, screen } from "../../../test-utils/test-library-utils"
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

test("displays image for each toppings from the server", async () => {
  render(<Options optionType="toppings" />)

  const toppingImages = await screen.findAllByRole("img", { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  const altText = toppingImages.map((element) => element.alt)
  expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot Fudge topping"])
})

test("Displays image for each toppings option from server", async () => {
  // Mock Service Worker will return three toppings from server
  render(<Options optionType="toppings" />)

  // find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole("img", { name: /topping$/i })
  expect(images).toHaveLength(3)

  // check the actual alt text for the images
  // @ts-ignore
  const imageTitles = images.map((img) => img.alt)
  expect(imageTitles).toEqual(["Cherries topping", "M&Ms topping", "Hot Fudge topping"])
})
