import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
// Import Component Anak
import JournalDashboard from "../component/JournalDashboard";
import JournalEditor from "../component/JournalEditor";
// Import Tipe Data Global (Pastikan file types.ts sudah ada)
import type { JournalEntry, Block, BlockType } from "../types";

export default function Journal() {
  const [showEditor, setShowEditor] = useState(false);

  // --- STATE DATABASE ---
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem("journal_entries");
    return saved ? JSON.parse(saved) : [];
  });

  // --- STATE EDITOR ---
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentFocusId, setCurrentFocusId] = useState<string | null>(null);

  const [blocks, setBlocks] = useState<Block[]>([
    { id: "initial-block", type: "text", content: "" },
  ]);

  // REF: Journal memiliki kontrol penuh atas input file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- EFFECTS ---
  useEffect(() => {
    localStorage.setItem("journal_entries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    if (currentFocusId) {
      const element = document.getElementById(
        `block-${currentFocusId}`,
      ) as HTMLTextAreaElement;
      if (element) {
        element.focus();
        const length = element.value.length;
        element.setSelectionRange(length, length);
      }
    }
  }, [currentFocusId]);

  // --- HELPER: BASE64 IMAGE (PENTING AGAR GAMBAR AWET) ---
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // --- HANDLERS: CRUD ENTRIES ---
  const handleCreateNew = () => {
    setEditingId(null);
    setTitle("");
    setBlocks([{ id: Date.now().toString(), type: "text", content: "" }]);
    setShowEditor(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setTitle(entry.title);
    setBlocks(entry.contentBlocks);
    setShowEditor(true);
  };

  const handleDeleteEntry = (e: MouseEvent, id: number) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please give your journal a title!");
      return;
    }

    const entryData: JournalEntry = {
      id: editingId || Date.now(),
      title,
      date: new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      preview: blocks[0]?.content || "No content...",
      contentBlocks: blocks,
    };

    if (editingId) {
      setEntries((prev) =>
        prev.map((item) => (item.id === editingId ? entryData : item)),
      );
    } else {
      setEntries((prev) => [entryData, ...prev]);
    }
    handleCloseEditor();
  };

  const handleCloseEditor = () => {
    setEditingId(null);
    setTitle("");
    setBlocks([{ id: "initial-block", type: "text", content: "" }]);
    setShowEditor(false);
  };

  // --- HANDLERS: BLOCK EDITOR ---
  const addBlock = (
    type: BlockType,
    extraData = {},
    index: number = blocks.length - 1,
  ) => {
    const newId = Date.now().toString();
    const newBlock: Block = { id: newId, type, content: "", ...extraData };
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks.splice(index + 1, 0, newBlock);
      return newBlocks;
    });
    setCurrentFocusId(newId);
  };

  const updateBlockContent = (id: string, newContent: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content: newContent } : b)),
    );
  };

  const deleteBlock = (id: string) => {
    if (blocks.length <= 1) return;
    const idx = blocks.findIndex((b) => b.id === id);
    const prevBlock = blocks[idx - 1];
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (prevBlock) setCurrentFocusId(prevBlock.id);
  };

  const handleKeyDown = (e: KeyboardEvent, blockId: string, index: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const typeToAdd = blocks[index].type === "list" ? "list" : "text";
      addBlock(typeToAdd, {}, index);
    }
    if (e.key === "Backspace" && blocks[index].content === "") {
      e.preventDefault();
      deleteBlock(blockId);
    }
  };

  // Logic Upload Gambar menggunakan Base64
  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await convertToBase64(file); // Tunggu konversi selesai
      addBlock("image", { src: base64 });
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900 font-sans selection:bg-blue-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* Input File milik Journal Controller */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {/* --- DASHBOARD VIEW --- */}
      <div className="container mx-auto max-w-4xl mb-8">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif tracking-tight">
            My Journal
          </h1>
          <p className="text-slate-500 mt-3 text-lg">
            {entries.length} entries saved so far.
          </p>
        </header>

        {!showEditor && (
          <JournalDashboard
            entries={entries}
            onCreateNew={handleCreateNew}
            onEditEntry={handleEditEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        )}
      </div>

      {/* --- EDITOR VIEW --- */}
      {showEditor && (
        <JournalEditor
          title={title}
          blocks={blocks}
          isEditing={editingId !== null}
          fileInputRef={fileInputRef} // Pass Ref ke Editor agar tombol gambar bisa diklik
          onTitleChange={setTitle}
          onBlockContentChange={updateBlockContent}
          onBlockKeyDown={handleKeyDown}
          onBlockDelete={deleteBlock}
          onAddBlock={addBlock}
          onSave={handleSave}
          onClose={handleCloseEditor}
        />
      )}
    </div>
  );
}
