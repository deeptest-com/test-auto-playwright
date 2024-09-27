import { expect, test } from "@playwright/test";
import { auto } from "../src/auto";
import {StepOptions} from "../src/types";

let nodeenv= process.env.NODE_ENV

if(nodeenv !== 'prod'){
  require('dotenv').config({path:'./.env.dev'})
}

const apiKey = process.env.AZURE_OPENAI_KEY;
const apiVersion = process.env.AZURE_OPENAI_VERSION;
const resource = process.env.AZURE_OPENAI_RESOURCE;
const model = process.env.AZURE_OPENAI_MODEL;

const options: StepOptions = {
  model: model,
  openaiApiKey: apiKey,
  openaiBaseUrl: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
  openaiDefaultQuery: { 'api-version': apiVersion },
  openaiDefaultHeaders: { 'api-key': apiKey }
};

test("executes click", async ({ page }) => {
  await page.goto("/");

  await auto("Click MyDog input until the counter value is equal to 2", {
    page,
    test
  }, options);

  await expect(page.getByTestId("current-count")).toHaveText("2");
});
