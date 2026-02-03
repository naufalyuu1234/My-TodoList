import { NavLink } from "react-router-dom";

export default function AboutHero() {
  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
      <div className="flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
          About MyProductivity
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
          Bantu kamu fokus, rapih, dan konsisten setiap hari.
        </h1>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
          MyProductivity dibuat untuk membantu kamu mengatur tugas, menjaga fokus,
          dan mencatat progres dengan cara yang simpel dan nyaman.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <NavLink
            to="/journal"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-blue-600 transition shadow-lg hover:shadow-blue-500/30"
          >
            Mulai Journaling
          </NavLink>
          <NavLink
            to="/features"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Lihat Fitur
          </NavLink>
        </div>
      </div>
    </section>
  );
}
