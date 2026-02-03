export default function AboutPurpose() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Kenapa dibuat?</h2>
        <p className="text-slate-600 mt-3 leading-relaxed">
          Banyak aplikasi produktivitas terasa berat dan rumit. Kami fokus pada
          pengalaman yang ringan, jelas, dan tidak bikin bingung, supaya kamu bisa
          langsung mulai tanpa banyak setup.
        </p>
        <p className="text-slate-600 mt-3 leading-relaxed">
          Tujuan utamanya sederhana: bantu kamu mempertahankan kebiasaan baik dan
          melihat progresmu dengan jelas dari hari ke hari.
        </p>
      </div>
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">
          Fokus Utama
        </p>
        <h3 className="text-xl font-bold mt-2">Distraction Free</h3>
        <p className="text-slate-200 mt-3 text-sm leading-relaxed">
          Tampilan bersih, hanya yang kamu butuhkan. Tidak ada fitur berlebihan
          yang mengganggu fokus.
        </p>
      </div>
    </section>
  );
}
