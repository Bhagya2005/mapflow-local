import Loading from "@/app/_components/ui/Loading"

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-[#1a1625] z-[999] flex flex-col items-center justify-center">
      <Loading />
      <p className="mt-4 text-[#7c5cfc] animate-pulse text-sm tracking-widest uppercase">
        Please wait...
      </p>
    </div>
  );
}