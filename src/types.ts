// File ini khusus menyimpan definisi tipe data agar bisa dipakai di mana saja.
import type { RefObject } from "react";

export type BlockType = "text" | "image" | "list";

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  src?: string;
}

export interface JournalEntry {
  id: number;
  title: string;
  date: string;
  preview: string;
  contentBlocks: Block[];
}

// Props untuk Dashboard
export interface JournalDashboardProps {
  entries: JournalEntry[];
  onCreateNew: () => void;
  onEditEntry: (entry: JournalEntry) => void;
  onDeleteEntry: (e: React.MouseEvent, id: number) => void;
}

// Props untuk Editor
export interface JournalEditorProps {
  title: string;
  blocks: Block[];
  isEditing: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onTitleChange: (val: string) => void;
  onBlockContentChange: (id: string, val: string) => void;
  onBlockKeyDown: (e: React.KeyboardEvent, id: string, index: number) => void;
  onBlockDelete: (id: string) => void;
  onAddBlock: (type: BlockType, extraData?: any, index?: number) => void;
  onSave: () => void;
  onClose: () => void;
}
