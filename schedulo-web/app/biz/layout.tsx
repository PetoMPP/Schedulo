import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedulo - Business",
  description: "Manage your business with Schedulo Biz!",
};

export default function BizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
