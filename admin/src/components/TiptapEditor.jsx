import { React, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
    FaBold,
    FaItalic,
    FaUndo,
    FaRedo
} from "react-icons/fa";
import {
    MdFormatAlignLeft,
    MdFormatAlignCenter,
    MdFormatAlignRight,
    MdLink,
    MdLinkOff
} from "react-icons/md";
import Image from "@tiptap/extension-image";
import "./tiptap.css"; // file này bạn sẽ tạo bên dưới

const MenuBar = ({ editor }) => {
    const [url, setUrl] = useState("");

    if (!editor) return null;

    return (

        <div className="mb-3 flex gap-2">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "btn btn-dark" : "btn btn-light"}
            >
                <FaBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "btn btn-dark" : "btn btn-light"}
            >
                <FaItalic />
            </button>
            <button onClick={() => editor.chain().focus().undo().run()} className="btn btn-light">
                <FaUndo />
            </button>
            <button onClick={() => editor.chain().focus().redo().run()} className="btn btn-light">
                <FaRedo />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                className={editor.isActive({ textAlign: "left" }) ? "btn btn-dark" : "btn btn-light"}
            >
                <MdFormatAlignLeft />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                className={editor.isActive({ textAlign: "center" }) ? "btn btn-dark" : "btn btn-light"}
            >
                <MdFormatAlignCenter />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                className={editor.isActive({ textAlign: "right" }) ? "btn btn-dark" : "btn btn-light"}
            >
                <MdFormatAlignRight />
            </button>

            <button
                onClick={() => {
                    const rawUrl = window.prompt("Nhập URL ảnh:");
                    if (!rawUrl) return;

                    const url = rawUrl.trim().replace(/^['"]|['"]$/g, "");

                    // Chèn ảnh bằng API Tiptap
                    editor.chain().focus().setImage({ src: url }).run();
                }}
                className="btn btn-light"
            >
                🖼️ Ảnh
            </button>
            <button
                onClick={() => {
                    const previousUrl = editor.getAttributes("link").href;
                    const newUrl = window.prompt("Nhập URL:", previousUrl || "https://");

                    if (newUrl === null) return; // Cancel
                    if (newUrl === "") {
                        editor.chain().focus().unsetLink().run();
                        return;
                    }

                    editor.chain().focus().setLink({ href: newUrl }).run();
                }}
                className={editor.isActive("link") ? "btn btn-dark" : "btn btn-light"}
            >
                <MdLink />
            </button>

            <button
                onClick={() => editor.chain().focus().unsetLink().run()}
                className="btn btn-light"
            >
                <MdLinkOff />
            </button>

        </div>
    );
};

const TiptapEditor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: false,
                allowBase64: true,
            }),
        ],
        content: content || "<p>Start writing here...</p>",
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            if (onChange) onChange(html);
        },
    });

    return (
        <div className="border p-3 rounded shadow-sm bg-white tiptap-editor-wrapper">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <hr className="my-4" />
        </div>
    );
};

export default TiptapEditor;
