import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* Navbar Atas */}
      <Navbar />

      {/* Hero Section dengan Background Video */}
      <Hero />

      {/* Skading skadung padungding dung padungking */}
      <section id="villas" className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif tracking-wider mb-4">The Villas</h2>
        <p className="text-neutral-400 text-sm max-w-xl mx-auto">
          Explore our collection of private luxury villas designed for your ultimate comfort and relaxation in Ubud.
        </p>
      </section>
    </main>
  );
}