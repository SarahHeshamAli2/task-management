import Breadcrumb from "@/components/ui/bread-crumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-4 hidden md:block">
        <Breadcrumb />
      </div>
      {children}
    </>
  );
}
