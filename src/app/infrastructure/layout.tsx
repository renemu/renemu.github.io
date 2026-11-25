export default function InfrastructureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="infrastructure-page">{children}</div>;
}
