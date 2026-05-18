export default function IssueDocentLoading() {
  return (
    <div className="min-h-screen min-w-[1376px] bg-white text-[#1d1d1f]">
      <main className="mx-[100px] w-[1176px] pb-16 pt-10">
        <div className="h-9 w-64 rounded bg-[#f7f8fa]" />
        <div className="mt-8 grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-44 rounded-lg border border-[#e0e0e0] bg-[#fbfcfd]"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
