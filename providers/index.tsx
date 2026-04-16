import StoreProvider from "./_components/store-provider";

type ProvidersProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <StoreProvider>{children}</StoreProvider>
    </>
  );
}
