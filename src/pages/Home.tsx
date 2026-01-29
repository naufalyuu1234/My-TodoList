import { useEffect, useState } from "react";
import { Check, X, ClipboardList, Timer, BookOpen } from "lucide-react";
import getDailyQuote from "../utils/GetQuotes";
import { useNavigate } from "react-router-dom";

// Komponen StatCard (Tetap sama)
interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider">
      {label}
    </h3>
    <p className="text-2xl font-bold mt-1 text-slate-800">{value}</p>
  </div>
);

export default function Home() {
  // State untuk nama dan kontrol modal/popover
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // State untuk quote harian
  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);

  // Data Array fitur utama
  const features = [
    {
      id: 1,
      title: "To-Do List",
      desc: "Kelola tugas harianmu",
      icon: <ClipboardList className="w-6 h-6" />,
      path: "/todo",
    },
    {
      id: 2,
      title: "Focus Timer",
      desc: "Teknik Pomodoro untuk fokus",
      icon: <Timer className="w-6 h-6" />,
      path: "/timer",
    },
    {
      id: 3,
      title: "Daily Journal",
      desc: "Catat progres belajarmu",
      icon: <BookOpen className="w-6 h-6" />,
      path: "/journal",
    },
  ];

  const navigate = useNavigate();

  // use State quotes
  useEffect(() => {
    // Quotes random dalam beberapa detik
    const dailyQuote = getDailyQuote();
    setQuote(dailyQuote);

    const interval = setInterval(() => {
      const newQuote = getDailyQuote();
      setQuote(newQuote);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Halo{name ? `, ${name}` : ""}! 👋
          </h1>
          <p className="text-slate-500 mt-2">
            Apa rencana produktifmu hari ini?
          </p>
        </header>

        {/* Section Quote Harian */}
        {quote && (
          <section className="mb-12 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <blockquote className="text-lg italic text-slate-700">
              "{quote.q}"
            </blockquote>
            <p className="text-right mt-2 text-slate-500">— {quote.a}</p>
          </section>
        )}

        {/* Section Statistik */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Tasks Completed" value={42} />
          <StatCard label="Focus Sessions" value={15} />
          <StatCard label="Journal Entries" value={8} />
        </section>

        {/* Section Fitur Utama */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-500 rounded-full inline-block"></span>
            Main Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((item) => (
              <div
                onClick={() => navigate(item.path)}
                key={item.id}
                className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  {item.title}
                </h3>
                <p className="text-slate-500 mt-2 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA untuk masuk ke halaman features */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-10 mx-auto block"
        onClick={() => navigate("/features")}
      >
        Explore Features 🚀
      </button>

      {/* --- FLOATING UI UNTUK INPUT NAMA --- */}
      <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-50">
        {/* Popover Input (Hanya muncul jika isEditing true) */}
        {isEditing && (
          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 w-72 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-slate-700">
                Set Your Name
              </span>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative">
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name..."
                className="w-full pl-3 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
              />
              <button
                onClick={() => setIsEditing(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-1 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Check size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
