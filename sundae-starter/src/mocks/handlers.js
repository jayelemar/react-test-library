import { http, HttpResponse } from "msw"

const mockScoops = [
  { name: "Chocolate", imagePath: "/images/chocolate.png" },
  { name: "Vanilla", imagePath: "/images/vanilla.png" },
]

const mockToppings = [
  { name: "Cherries", imagePath: "/images/cherries.png" },
  { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
  { name: "Hot Fudge", imagePath: "/images/hot-fudge.png" },
]

export const handlers = [
  http.get("http://localhost:3030/scoops", () => {
    return HttpResponse.json(mockScoops)
  }),
  http.get(`http://localhost:3030/toppings`, () => {
    return HttpResponse.json(mockToppings)
  }),
]
