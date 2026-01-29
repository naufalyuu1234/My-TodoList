import { useState } from "react";

export default function Todo() {
  // Memory untuk pemilihan waktu fokus
  const [focusTime, setFocusTime] = useState("morning");
  // Tambahkan state baru di dalam fungsi Todo()
  const [todos, setTodos] = useState<
    {
      id: number;
      text: string;
      priorityColor: string;
      completed: boolean;
      timeRange: string | null;
      customTimes: string | null;
    }[]
  >([]);
  const [task, setTask] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("bg-slate-400"); // Default: Tidak Penting

  // Fungsi untuk menambah tugas
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return; // Jangan tambah kalau kosong

    // Cari chronotype yang sesuai dengan focusTime
    const selectedChronotype = chronotypes.find((c) => c.id === focusTime);

    const newTodo = {
      id: Date.now(),
      text: task,
      priorityColor: selectedPriority,
      completed: false,
      // Tambahkan waktu fokus hanya untuk tugas penting
      timeRange:
        selectedPriority == "bg-emerald-500" && selectedChronotype
          ? selectedChronotype.timeRange
          : null,
      customTimes: null,
    };

    setTodos([newTodo, ...todos]);
    setTask(""); // Reset input setelah klik tambah
  };

  // Fungsi hapus tugas
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Fungsi tandai selesai
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // fungsi update waktu fokus tugas penting
  const timeUpdate = (id: number, newTime: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, timeRange: newTime } : todo,
      ),
    );
  };
  // Data prioritas tugas
  const priorities = [
    { label: "Tidak Penting", color: "bg-slate-400" },
    { label: "Penting", color: "bg-emerald-500" },
    { label: "Urgent", color: "bg-rose-600" },
  ];

  //   Data Chronotypes
  const chronotypes = [
    {
      id: "morning",
      label: "Early Bird",
      timeRange: "08:00 - 12:00",
      icon: "🌅",
    },
    {
      id: "afternoon",
      label: "Midday Performer",
      timeRange: "13:00 - 17:00",
      icon: "☀️",
    },
    {
      id: "evening",
      label: "Night Owl",
      timeRange: "20:00 - 00:00",
      icon: "🌙",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900 font-sans selection:bg-blue-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        
        /* Kita override default tailwind classes */
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
      <div className="container mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif tracking-tight">
            Todo - List ☑️
          </h1>
          <p className="text-slate-500 mt-2 max-w-2xl leading-relaxed font-medium">
            Nggak perlu bingung lagi nyusun jadwal. Kelola tugas harianmu jadi
            lebih terstruktur dengan Todo List.
          </p>
          <p className="text-blue-600/80 text-sm mt-4 font-medium">
            💡 Tips: Susun tugas berdasarkan prioritas terpentingmu hari ini.
          </p>

          {/* Prioritas Tugas */}
          <div className="flex gap-4 mt-6">
            {priorities.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <span
                  className={`inline-block w-4 h-4 rounded-full ${item.color}`}
                ></span>
                <span className="text-sm text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Pilihan Chronotype */}
          <div className="mt-10 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-3">
              Kapan waktu fokus terbaikmu?
            </h3>
            <div className="flex flex-wrap gap-3">
              {chronotypes.map((type) => (
                <button
                  key={type.id}
                  className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 transition-all ${
                    focusTime === type.id
                      ? "border-blue-500 bg-blue-50 shadow-md scale-[1.02]"
                      : "border-white bg-white hover:border-slate-200 shadow-sm"
                  }`}
                  onClick={() => setFocusTime(type.id)}
                >
                  <span>{type.icon}</span>
                  <div className="text-left">
                    <p
                      className={`font-bold ${
                        focusTime === type.id
                          ? "text-blue-700"
                          : "text-slate-900"
                      }`}
                    >
                      {type.label}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {type.timeRange}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section Todo List */}
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8 mt-6">
            <form
              onSubmit={addTodo}
              className="flex flex-col md:flex-row gap-4"
            >
              {/* Input Teks */}
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Tulis tugas barumu di sini..."
                className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none text-slate-700"
              />

              <div className="flex gap-3 items-center">
                {/* Pilih Warna Prioritas */}
                <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl">
                  {priorities.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPriority(p.color)}
                      className={`w-8 h-8 rounded-full ${
                        p.color
                      } transition-all ${
                        selectedPriority === p.color
                          ? "ring-4 ring-white shadow-md scale-110"
                          : "opacity-40"
                      }`}
                    />
                  ))}
                </div>

                {/* Tombol Tambah */}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200"
                >
                  Tambah
                </button>
              </div>
            </form>
          </section>

          {/* Daftar Tugas */}
          <div className="space-y-4">
            {todos.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-400 italic">
                  Belum ada tugas. Yuk, mulai produktif!
                </p>
              </div>
            ) : (
              todos.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    {/* Input centang */}
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleComplete(item.id)}
                      className="w-5 h-5 accent-blue-600 cursor-pointer transition-transform duration-300 ease-in-out"
                    />
                    {/* Bulatan Prioritas (Kiri) */}
                    <div
                      className={`w-3 h-3 rounded-full ${item.priorityColor}`}
                    />

                    {/* Teks Tugas */}
                    <div className="flex flex-col items-start">
                      <span
                        onClick={() => toggleComplete(item.id)}
                        className={`animate-fadeSlide cursor-pointer transition-all ${
                          item.completed
                            ? "line-through text-slate-400 opacity-60 translate-x-1"
                            : "text-slate-700 font-medium opacity-100 translate-x-0"
                        }`}
                      >
                        {item.text}
                      </span>

                      {/* Tampilkan waktu fokus jika ada */}
                      {item.timeRange && (
                        <p className="text-[12px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full mt-1">
                          ⏰ {item.timeRange}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Kostumisasi waktu fokus */}
                  {/* Input waktu spesifik */}
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-[10px] text-slate-500 font-medium">
                      Atur Waktu sesuka anda disini!
                    </p>
                    <input
                      type="time"
                      value={item.customTimes || ""}
                      onChange={(e) => timeUpdate(item.id, e.target.value)}
                      className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100transition-all duration-200 hover:border-slate-300"
                    />
                  </div>
                  {/* Tombol Hapus (Muncul saat hover) */}
                  <button
                    onClick={() => deleteTodo(item.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </header>
      </div>
    </div>
  );
}
