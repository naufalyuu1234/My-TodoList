import { useEffect, useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { Trash2 } from "lucide-react";
import type { BlockType } from "../types"; // Menggunakan tipe data global agar konsisten

interface EditorBlockProps {
  id: string;
  type: BlockType;
  content: string;
  src?: string;
  onUpdate: (id: string, content: string) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onDelete: (id: string) => void;
}

export default function EditorBlock({
  id,
  type,
  content,
  src,
  onUpdate,
  onKeyDown,
  onDelete,
}: EditorBlockProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // UX IMPROVEMENT: Auto-resize saat pertama kali dimuat atau saat konten berubah
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="group relative mb-4">
      {/* Tombol Delete (Muncul saat hover) */}
      <button
        onClick={() => onDelete(id)}
        className="absolute -left-8 top-1 text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition p-1"
        title="Delete block"
      >
        <Trash2 size={16} />
      </button>

      {/* TIPE: TEXT */}
      {type === "text" && (
        <textarea
          ref={textareaRef}
          id={`block-${id}`}
          value={content}
          onChange={(e) => onUpdate(id, e.target.value)}
          onKeyDown={onKeyDown}
          onInput={handleInput}
          placeholder="Tell your story..."
          className="w-full resize-none text-slate-700 text-lg leading-loose focus:outline-none placeholder:text-slate-300 font-serif bg-transparent overflow-hidden"
          rows={1}
        />
      )}

      {/* TIPE: IMAGE */}
      {type === "image" && (
        <div className="relative rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
          <img
            src={src}
            alt="Uploaded"
            className="w-full h-auto object-cover"
          />
          <input
            className="w-full text-center text-sm text-slate-500 bg-transparent border-none focus:ring-0 py-2 placeholder:text-slate-300"
            placeholder="Write a caption..."
            onKeyDown={onKeyDown}
          />
        </div>
      )}

      {/* TIPE: LIST */}
      {type === "list" && (
        <div className="flex gap-3 items-start">
          <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-800 flex-shrink-0" />
          <textarea
            ref={textareaRef}
            id={`block-${id}`}
            value={content}
            onChange={(e) => onUpdate(id, e.target.value)}
            onKeyDown={onKeyDown}
            onInput={handleInput}
            placeholder="List item..."
            className="w-full resize-none text-slate-700 text-lg leading-relaxed focus:outline-none placeholder:text-slate-300 font-serif bg-transparent"
            rows={1}
          />
        </div>
      )}
    </div>
  );
}
