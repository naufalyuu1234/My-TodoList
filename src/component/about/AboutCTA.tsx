import { NavLink } from "react-router-dom";

export default function AboutCTA() {
  return (
    <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Siap bikin harimu lebih rapi?
          </h2>
          <p className="text-slate-300 mt-2 max-w-xl">
            Mulai dari satu kebiasaan kecil. Sisanya akan mengikuti.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <NavLink
            to="/journal"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition"
          >
            Buat Entry Pertama
          </NavLink>
          <NavLink
            to="/features"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Lihat Semua Fitur
          </NavLink>
        </div>
      </div>
    </section>
  );
}
