import { useState, useEffect } from "react";

export default function Timer() {
  // Type
  type FocusMode = "pomodoro" | "deepFocus";
  // useState
  const [focusMode, setFocusMode] = useState<FocusMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // UseEffect untuk menyambungkan mode timer
  useEffect(() => {
    const modeConfig = focusModeData.find((mode) => mode.id === focusMode); // mencari konfigurasi mode berdasarkan focusMode saat ini
    if (!modeConfig) return;

    setTimeLeft(modeConfig.duration); // jika mode berubah, waktu otomatis diatur ulang
    setIsRunning(false); // reset timer saat mode berubah
  }, [focusMode]);

  // Timer Enggine
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // Handle reset mas bro
  const handleReset = () => {
    const modeConfig = focusModeData.find((mode) => mode.id === focusMode);
    if (!modeConfig) return;
    setTimeLeft(modeConfig.duration);
    setIsRunning(false);
  };

  // data timer
  const focusModeData = [
    {
      id: "pomodoro",
      label: "Pomodoro",
      description: " 25 menit fokus, 5 menit istirahat",
      icon: "🍅",
      duration: 25 * 60,
    },
    {
      id: "deepFocus",
      label: "Deep Focus",
      description: "Fokus panjang tanpa gangguan",
      icon: "🧘‍♂️",
      duration: 90 * 60,
    },
  ];

  // Format waktu
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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
            Focus Timer
          </h1>
          <p className="text-slate-500 mt-2 max-w-sm md:max-w-2xl leading-relaxed font-medium">
            Belajar bukan tentang berapa lama kamu duduk, tapi seberapa fokus
            kamu saat belajar, Tingkatkan fokusmu disini.
          </p>

          {/* Focus Mode Selection */}
          <div className="mt-10 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-3">
              Pilih Mode Fokus
            </h3>
            {/* Mapping focusModeData */}
            <div className="flex flex-col md:flex-row gap-3">
              {focusModeData.map((mode) => {
                const active = focusMode === String(mode.id);

                return (
                  <button
                    key={mode.id}
                    onClick={() => setFocusMode(mode.id as FocusMode)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all ${
                      active
                        ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xl">{mode.icon}</span>

                    <div className="text-left">
                      <p
                        className={`font-bold ${
                          active ? "text-blue-600" : "text-slate-900"
                        }`}
                      >
                        {mode.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {mode.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timer Display */}
          <div className="mt-12 flex flex-col items-center text-center bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
              {/* card menit */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Menit
                </span>
                <div className="w-24 h-28 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100">
                  <span className="text-5xl font-bold text-slate-700">
                    {minutes.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Pemisah */}
              <div className="text-4xl font-bold text-blue-300 self-end mb-8">
                :
              </div>

              {/* Card Detik */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Detik
                </span>
                <div className="w-24 h-28 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100">
                  <span className="text-5xl font-bold text-slate-700">
                    {seconds.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Mode: {focusMode === "pomodoro" ? "Pomodoro" : "Deep Focus"}
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setIsRunning(false)}
                disabled={!isRunning}
                className="px-6 py-3 rounded-xl bg-slate-200 text-slate-800 font-semibold disabled:opacity-50"
              >
                Pause
              </button>
              <button
                onClick={() => setIsRunning(true)}
                disabled={isRunning}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold disabled:opacity-50"
              >
                Start
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-slate-200 text-slate-800 font-semibold disabled:opacity-50"
              >
                reset
              </button>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
