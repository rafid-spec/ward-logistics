import { renderOg } from "../og";

export const dynamic = "force-static";

// Share image as a real .png file so static hosts serve it with the right content type.
export function GET() {
  return renderOg("en");
}
