import { Plus, Calendar, ChevronRight, Pencil, Trash2 } from "lucide-react";
import type { JournalDashboardProps } from "../types"; // Import tipe dari file types.ts

export default function JournalDashboard({
  entries,
  onCreateNew,
  onEditEntry,
  onDeleteEntry,
}: JournalDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Tombol Add New */}
      <button
        onClick={onCreateNew}
        className="w-full flex items-center justify-center gap-2 px-5 py-6 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all group"
      >
        <div className="bg-slate-200 group-hover:bg-blue-200 p-2 rounded-full transition-colors">
          <Plus size={24} className="group-hover:text-blue-700" />
        </div>
        <span className="font-medium text-lg">Create New Entry</span>
      </button>

      {/* List Entries */}
      <div className="grid gap-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            onClick={() => onEditEntry(entry)}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100 cursor-pointer group relative"
          >
            <div className="flex justify-between items-start pr-12">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-800 group-hover:text-blue-600 transition-colors">
                  {entry.title}
                </h3>
                <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                  <Calendar size={14} /> {entry.date}
                </p>
                <p className="text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {entry.preview}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); onEditEntry(entry); }}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={(e) => onDeleteEntry(e, entry.id)}
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="absolute bottom-6 right-6 opacity-50 group-hover:opacity-100 transition">
              <ChevronRight className="text-slate-300 group-hover:text-blue-500" />
            </div>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No stories yet. Start writing today!
          </div>
        )}
      </div>
    </div>
  );
}