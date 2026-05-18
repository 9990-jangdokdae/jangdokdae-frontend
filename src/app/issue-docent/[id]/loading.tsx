export default function IssueDocentDetailLoading() {
  return (
    <div className="min-h-screen min-w-[1376px] bg-white text-[#1d1d1f]">
      <main className="mx-[100px] w-[1176px] pb-16 pt-10">
        <div className="h-5 w-28 rounded bg-[#f7f8fa]" />
        <div className="mt-5 h-12 w-[760px] rounded bg-[#f7f8fa]" />
        <div className="mt-10 grid w-[760px] gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-lg border border-[#e0e0e0] bg-[#fbfcfd]"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
