import { Toaster } from "sonner";
import StoreProvider from "./_components/store-provider";

type ProvidersProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Toaster />
      <StoreProvider>{children}</StoreProvider>
    </>
  );
}
