import React, { useState } from "react";

export default function FloatingToggle() {
  const [name, setName] = useState("");
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (name.trim()) {
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 flex items-center justify-center p-5">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full animate-float">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Selamat Datang!
          </h2>
          <p className="text-gray-500 text-sm">
            Silakan lengkapi formulir di bawah ini
          </p>
        </div>

        <div>
          <div className="mb-6">
            <label
              htmlFor="nameInput"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Tolong masukkan nama Anda
            </label>
            <input
              type="text"
              id="nameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Masukkan nama Anda..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
            />
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-6">
            <span className="text-gray-700 text-sm font-medium">
              Aktifkan notifikasi
            </span>
            <button
              type="button"
              onClick={() => setNotifEnabled(!notifEnabled)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-purple-100 ${
                notifEnabled ? "bg-purple-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                  notifEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:translate-y-0"
          >
            Kirim
          </button>
        </div>

        {showResult && (
          <div className="mt-5 bg-green-50 text-green-700 px-4 py-3 rounded-xl text-center animate-slideIn">
            Halo {name}! Notifikasi{" "}
            {notifEnabled ? "diaktifkan" : "dinonaktifkan"}. ✓
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease;
        }
      `}</style>
    </div>
  );
}
