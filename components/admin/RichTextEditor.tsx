"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  ImageIcon,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Write your article content here...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[250px] w-full rounded-md border border-border bg-background p-4 text-muted-foreground/60 text-sm flex items-center justify-center">
        Loading TipTap Editor...
      </div>
    );
  }

  const addImage = () => {
    const url = window.prompt("URL of the image:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-card border-b border-border">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("bold") ? "bg-secondary text-amber-400" : ""}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("italic") ? "bg-secondary text-amber-400" : ""}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("strike") ? "bg-secondary text-amber-400" : ""}`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-secondary mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("heading", { level: 1 }) ? "bg-secondary text-amber-400" : ""}`}
          title="H1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("heading", { level: 2 }) ? "bg-secondary text-amber-400" : ""}`}
          title="H2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("heading", { level: 3 }) ? "bg-secondary text-amber-400" : ""}`}
          title="H3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-secondary mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("bulletList") ? "bg-secondary text-amber-400" : ""}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("orderedList") ? "bg-secondary text-amber-400" : ""}`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("blockquote") ? "bg-secondary text-amber-400" : ""}`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-secondary mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded hover:bg-secondary text-muted-foreground ${editor.isActive("link") ? "bg-secondary text-amber-400" : ""}`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-1.5 rounded hover:bg-secondary text-muted-foreground"
          title="Insert Image URL"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <span className="w-px h-5 bg-secondary mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded hover:bg-secondary text-muted-foreground"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded hover:bg-secondary text-muted-foreground"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} className="min-h-[300px] text-slate-100 p-4 font-sans text-sm focus:outline-none" />
    </div>
  );
}
