// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:8080/api/account/login", (req, res, ctx) => {
    localStorage.setItem("is-authenticated", "true");
    return res(
      ctx.cookie(
        "auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTZkMzRmYjlmNWZjODYxMzc2NWUxNSIsImVtYWlsIjoiY2hhbmdAeHl6LmNvbSIsImlhdCI6MTY1NTMwNTg1MX0.v6J9qGBnqALMcwel1yeLYuW1mPqjG25Tu96CVKrYfW8"
      )
    );
  }),

  rest.get("http://localhost:8080/api/account/refresh", (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          account: {
            contact: 99118822,
            email: "testmode@xyz.com",
            id: "6296d34fb9f5fc8613765e15",
            image:
              "http://localhost:8080/public/2c7648bd-91b6-4368-8ef1-b0136a34cbc0-1655534978207-chang-jing-yan-picture.jpg",
            username: "Test",
          },
        },
      })
    );
  }),
];
