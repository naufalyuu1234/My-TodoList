import { BookOpen, ClipboardList, Timer } from "lucide-react";

const features = [
  {
    id: 1,
    title: "To-Do List",
    desc: "Atur tugas harian tanpa ribet.",
    icon: ClipboardList,
  },
  {
    id: 2,
    title: "Focus Timer",
    desc: "Bantu kamu tetap fokus dengan Pomodoro.",
    icon: Timer,
  },
  {
    id: 3,
    title: "Daily Journal",
    desc: "Catat progres dan refleksi singkat setiap hari.",
    icon: BookOpen,
  },
];

export default function AboutFeatures() {
  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="w-10 h-1 bg-blue-500 rounded-full" />
        <h2 className="text-2xl font-bold text-slate-900">Fitur Inti</h2>
      </div>
      <p className="text-slate-600 mt-3 max-w-2xl">
        Semua fitur dirancang untuk saling melengkapi agar workflow kamu tetap
        rapi dan konsisten.
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
              <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
