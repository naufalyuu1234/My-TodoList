const steps = [
  {
    id: 1,
    title: "Mulai dari tujuan kecil",
    desc: "Tulis tugas prioritas dan target fokus hari ini.",
  },
  {
    id: 2,
    title: "Kerjakan dengan ritme",
    desc: "Gunakan timer untuk menjaga fokus dan jeda yang sehat.",
  },
  {
    id: 3,
    title: "Catat progres",
    desc: "Akhiri hari dengan jurnal singkat agar konsisten.",
  },
];

export default function AboutHowItWorks() {
  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">Cara Kerja</h2>
      <p className="text-slate-600 mt-3 max-w-2xl">
        Hanya tiga langkah sederhana untuk membangun kebiasaan produktif.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="p-6 border border-slate-200 rounded-2xl bg-slate-50"
          >
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
              {step.id}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-4">
              {step.title}
            </h3>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
