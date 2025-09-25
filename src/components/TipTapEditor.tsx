"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, List, ListOrdered, Heading2, Undo, Redo, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({ content, onChange, placeholder = "Mulai menulis konten artikel..." }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-w-none p-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL Gambar:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL Link:", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bold") ? "bg-gray-300" : ""}`} title="Bold">
          <Bold className="w-4 h-4" />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("italic") ? "bg-gray-300" : ""}`} title="Italic">
          <Italic className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""}`} title="Heading 2">
          <Heading2 className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("bulletList") ? "bg-gray-300" : ""}`} title="Bullet List">
          <List className="w-4 h-4" />
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("orderedList") ? "bg-gray-300" : ""}`} title="Numbered List">
          <ListOrdered className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        <button type="button" onClick={setLink} className={`p-2 rounded hover:bg-gray-200 ${editor.isActive("link") ? "bg-gray-300" : ""}`} title="Add Link">
          <LinkIcon className="w-4 h-4" />
        </button>

        <button type="button" onClick={addImage} className="p-2 rounded hover:bg-gray-200" title="Add Image">
          <ImageIcon className="w-4 h-4" />
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed" title="Undo">
          <Undo className="w-4 h-4" />
        </button>

        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed" title="Redo">
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="bg-white" />
    </div>
  );
}
