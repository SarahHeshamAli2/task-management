import { Toaster } from "sonner";
import StoreProvider from "./_components/store-provider";
import ReactQueryProvider from "./_components/react-query-provider";

type ProvidersProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ReactQueryProvider>
        <Toaster />
        <StoreProvider>{children}</StoreProvider>
      </ReactQueryProvider>
    </>
  );
}
