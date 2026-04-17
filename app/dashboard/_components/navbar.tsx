import UserInfo from "./user-info";

export default async function Navbar() {
  return (
    <div className="bg-background w-full border-b  border-[#0000001A] min-h-16 flex justify-end">
      <UserInfo />
    </div>
  );
}
