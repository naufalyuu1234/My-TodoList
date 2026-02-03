import { useEffect, useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { Trash2 } from "lucide-react";
import type { Block, BlockType } from "../types";

interface BlockEditorProps {
  block: Block;
  index: number;
  onContentChange: (id: string, content: string) => void;
  onKeyDown: (e: KeyboardEvent, blockId: string, index: number) => void;
  onDelete: (id: string) => void;
  onAddBlock: (type: BlockType, extraData?: any, index?: number) => void;
}

export default function BlockEditor({
  block,
  index,
  onContentChange,
  onKeyDown,
  onDelete,
  onAddBlock,
}: BlockEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Efek untuk auto-resize textarea biar nggak ada scrollbar internal
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [block.content]);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(block.id, e.target.value);
  };

  const handleListChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(block.id, e.target.value);
  };

  const handleImageCaptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    onContentChange(block.id, e.target.value);
  };

  return (
    <div className="group relative mb-4">
      {/* Tombol Delete: Muncul saat hover di desktop, tapi di mobile sebaiknya selalu terlihat sedikit atau swipe */}
      <button
        onClick={() => onDelete(block.id)}
        className="absolute -left-2 md:-left-10 top-2 text-slate-300 hover:text-red-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition p-1 bg-white md:bg-transparent rounded-full shadow-sm md:shadow-none"
        title="Delete block"
      >
        <Trash2 size={16} />
      </button>

      {/* TIPE: TEXT */}
      {block.type === "text" && (
        <textarea
          ref={textareaRef}
          id={`block-${block.id}`}
          value={block.content}
          onChange={handleTextChange}
          onKeyDown={(e) => onKeyDown(e, block.id, index)}
          placeholder="Tell your story..."
          className="w-full resize-none text-slate-700 text-base md:text-lg leading-loose focus:outline-none placeholder:text-slate-200 font-serif bg-transparent overflow-hidden"
          rows={1}
        />
      )}

      {/* TIPE: IMAGE */}
      {block.type === "image" && (
        <div className="relative rounded-xl overflow-hidden border border-slate-100 bg-slate-50 my-2 md:my-4">
          <img
            src={block.src}
            alt="Uploaded"
            className="w-full h-auto object-cover max-h-[500px]"
          />
          <input
            value={block.content}
            onChange={handleImageCaptionChange}
            className="w-full text-center text-xs md:text-sm text-slate-500 bg-white/50 backdrop-blur-sm border-none focus:ring-0 py-3 placeholder:text-slate-300"
            placeholder="Tulis keterangan gambar di sini..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddBlock("text", {}, index);
              }
            }}
          />
        </div>
      )}

      {/* TIPE: LIST */}
      {block.type === "list" && (
        <div className="flex gap-3 items-start">
          <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-800 flex-shrink-0" />
          <textarea
            ref={textareaRef}
            id={`block-${block.id}`}
            value={block.content}
            onChange={handleListChange}
            onKeyDown={(e) => onKeyDown(e, block.id, index)}
            placeholder="List item..."
            className="w-full resize-none text-slate-700 text-base md:text-lg leading-relaxed focus:outline-none placeholder:text-slate-200 font-serif bg-transparent"
            rows={1}
          />
        </div>
      )}
    </div>
  );
}
