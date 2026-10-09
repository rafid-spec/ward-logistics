import { buildMetadata, Html } from "../shell";

export { viewport } from "../shell";
export const metadata = buildMetadata("en");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Html lang="en">{children}</Html>;
}
