export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 px-8 border-b border-stone-100 bg-white">
      <h1 className="text-xl font-serif">UBUD HAVEN</h1>
      <div className="space-x-8 text-sm uppercase tracking-widest text-stone-600">
        <a href="/" className="hover:text-stone-900">Home</a>
        <a href="/villas" className="hover:text-stone-900">Villas</a>
        <a href="#" className="hover:text-stone-900">Booking</a>
      </div>
    </nav>
  );
}