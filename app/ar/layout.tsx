import { buildMetadata, Html } from "../shell";

export { viewport } from "../shell";
export const metadata = buildMetadata("ar");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Html lang="ar">{children}</Html>;
}
