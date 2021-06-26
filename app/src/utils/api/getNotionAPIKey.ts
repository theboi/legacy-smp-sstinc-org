import { random } from "../misc";

export default function getNotionAPIKey(): string {
  return process.env[`NOTION_API_KEY${random(1, 6)}`];
}
