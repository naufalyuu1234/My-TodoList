import {
  X,
  Type,
  Image as ImageIcon,
  List,
  Share2,
  MoreVertical,
} from "lucide-react";
import type { JournalEditorProps } from "../types";
import EditorBlock from "./BlockEditor";

export default function JournalEditor({
  title,
  blocks,
  isEditing,
  fileInputRef,
  onTitleChange,
  onBlockContentChange,
  onBlockKeyDown,
  onBlockDelete,
  onAddBlock,
  onSave,
  onClose,
}: JournalEditorProps) {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen container mx-auto max-w-3xl bg-white shadow-2xl my-0 md:my-10 rounded-none md:rounded-2xl border border-slate-200 flex flex-col">
        {/* Header Toolbar */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur z-10">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 flex items-center gap-2 text-sm font-medium"
          >
            <X size={20} /> Cancel
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest hidden md:inline-block">
              {isEditing ? "EDITING MODE" : "NEW ENTRY"}
            </span>
            <button
              onClick={onSave}
              className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition shadow-lg hover:shadow-blue-500/30"
            >
              {isEditing ? "Update Entry" : "Save Entry"}
            </button>
          </div>
        </div>

        {/* Canvas Editor */}
        <div className="flex-1 p-8 md:p-12 pb-32">
          {/* Input Judul */}
          <input
            type="text"
            placeholder="Untitled"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full text-4xl md:text-5xl font-bold font-serif text-slate-900 placeholder:text-slate-200 border-none focus:ring-0 p-0 bg-transparent mb-6"
            autoFocus
          />

          {/* List of Blocks */}
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <EditorBlock
                key={block.id}
                id={block.id}
                type={block.type}
                content={block.content}
                src={block.src}
                onUpdate={onBlockContentChange}
                onKeyDown={(e) => onBlockKeyDown(e, block.id, index)}
                onDelete={onBlockDelete}
              />
            ))}
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="p-4 flex justify-between items-center border-t border-slate-100 bg-white/90 backdrop-blur sticky bottom-0 z-10">
          <div className="flex gap-2">
            <button
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-md transition"
              onClick={() => onAddBlock("text", {}, blocks.length - 1)}
            >
              <Type size={18} />
            </button>
            <button
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-md transition"
              // Memicu click pada input file yang ada di Journal.tsx (Parent)
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon size={18} />
            </button>
            <button
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-md transition"
              onClick={() => onAddBlock("list", {}, blocks.length - 1)}
            >
              <List size={18} />
            </button>
          </div>
          <div className="flex gap-2 text-slate-400">
            <Share2 size={18} />
            <MoreVertical size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
