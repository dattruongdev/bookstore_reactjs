export default function PaymentCancel() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
      <div className="h-1/3 w-1/3 bg-white shadow-md flex flex-col m-auto justify-center items-center gap-5">
        <div className="text-lg font-semibold">Payment cancelled</div>
        <a
          href="/books"
          className="bg-red-400 py-3 px-5 text-sm rounded-full text-white hover:bg-red-400/80 hover:text-black"
        >
          Browse more books
        </a>
      </div>
    </div>
  );
}
