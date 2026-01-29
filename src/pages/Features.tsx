import { BookOpen, ClipboardList, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Data Array fitur utama
const features = [
  {
    id: 1,
    title: "To-Do List",
    desc: "Kelola tugas harianmu dengan mudah",
    icon: <ClipboardList className="w-6 h-6" />,
    path: "/todo",
  },
  {
    id: 2,
    title: "Focus Timer",
    desc: "Teknik Pomodoro untuk meningkatkan fokus",
    icon: <Timer className="w-6 h-6" />,
    path: "/timer",
  },
  {
    id: 3,
    title: "Daily Journal",
    desc: "Catat progres belajarmu setiap hari",
    icon: <BookOpen className="w-6 h-6" />,
    path: "/journal",
  },
];

// Variant warna untuk setiap fitur — menjaga struktur kartu konsisten,
// tapi menambahkan aksen warna ringan per fitur
const variants = [
  {
    border: "border-rose-100",
    accentBg: "bg-rose-50",
    iconColor: "text-rose-600",
    stripe: "bg-rose-600/10",
    hoverClasses: "group-hover:bg-rose-600 group-hover:text-white",
  },
  {
    border: "border-emerald-100",
    accentBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    stripe: "bg-emerald-600/10",
    hoverClasses: "group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    border: "border-sky-100",
    accentBg: "bg-sky-50",
    iconColor: "text-sky-600",
    stripe: "bg-sky-600/10",
    hoverClasses: "group-hover:bg-sky-600 group-hover:text-white",
  },
];

export default function Features() {
  const navigate = useNavigate();

  return (
    // Container utama halaman fitur
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Fitur Produktivitas Utama
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl">
            Tiga fitur inti yang membantu kamu mengatur tugas, menjaga fokus,
            dan mencatat progres belajar setiap hari.
          </p>
        </header>

        {/* Feature Cards */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((item) => {
              const v = variants[item.id - 1];
              return (
                <div
                  key={item.id}
                  className={`relative group p-6 bg-white ${v.border} rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer`}
                >
                  {/* subtle left accent stripe */}
                  <div
                    className={`${v.stripe} absolute inset-y-0 left-0 w-1 rounded-l-2xl`}
                  ></div>

                  <div
                    className={`w-12 h-12 ${v.accentBg} ${v.iconColor} rounded-lg flex items-center justify-center mb-4 transition-colors ${v.hoverClasses}`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Button handler */}
                  <div className="mt-4 w-full flex justify-center">
                    <button
                      onClick={() => navigate(item.path)}
                      className="px-4 py-2 rounded-full bg-white border text-sm font-medium hover:bg-slate-50 transition -colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                      aria-label={`Buka fitur ${item.title}`}
                    >
                      Buka Fitur
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
