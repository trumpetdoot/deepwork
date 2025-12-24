import SignoutButton from "@/components/signout-btn";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <SignoutButton />
      </div>
    </div>
  );
}
