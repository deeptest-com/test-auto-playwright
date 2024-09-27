import { expect, test } from "@playwright/test";
import { auto } from "../src/auto";

const options = {
  openaiApiKey: 'sk-Gl1V3nAzyE3m8wAiEEx6ijlcoux3Vx5lP4ZVj5v0tmaJYKhe',
  openaiBaseUrl: 'https://api.openai-proxy.org/v1'
}

test("executes click", async ({ page }) => {
  await page.goto("/");

  await auto("Click MyDog input until the counter value is equal to 2", {
    page,
    test
  }, options);

  await expect(page.getByTestId("current-count")).toHaveText("2");
});
