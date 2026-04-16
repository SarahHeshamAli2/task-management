import Logo from "@/components/ui/logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background ">
      <Logo className="mt-6.5 ms-10" />
      {children}
    </div>
  );
}
