import { useState } from 'react';
import { createOnePost } from '../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Link as TiptapLink } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { TextAlign } from '@tiptap/extension-text-align';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Code, List, ListOrdered, Quote,
  Heading1, Heading2, AlignLeft, AlignCenter, AlignRight,
  Link as LinkIcon, Image as ImageIcon
} from 'lucide-react';

// =======================
// 🌙 NEON MENU BAR
// =======================
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const btnStyle = (active) =>
    `p-2 rounded-md text-white shadow-md transition-all 
     ${active ? 'bg-cyan-600 shadow-cyan-500/40' : 'bg-cyan-800/40 hover:bg-cyan-700/60'}`;

  return (
    <div className="border-b border-cyan-900/40 p-2 flex flex-wrap gap-1 bg-[#0B1120]/70 backdrop-blur-md">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnStyle(editor.isActive('bold'))}><Bold size={18} /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnStyle(editor.isActive('italic'))}><Italic size={18} /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnStyle(editor.isActive('underline'))}><UnderlineIcon size={18} /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btnStyle(editor.isActive('strike'))}><Strikethrough size={18} /></button>

      <div className="w-px h-8 bg-cyan-900/40 mx-1" />

      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnStyle(editor.isActive('heading', { level: 1 }))}><Heading1 size={18} /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnStyle(editor.isActive('heading', { level: 2 }))}><Heading2 size={18} /></button>

      <div className="w-px h-8 bg-cyan-900/40 mx-1" />

      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnStyle(editor.isActive({ textAlign: 'left' }))}><AlignLeft size={18} /></button>

      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnStyle(editor.isActive({ textAlign: 'center' }))}><AlignCenter size={18} /></button>

      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnStyle(editor.isActive({ textAlign: 'right' }))}><AlignRight size={18} /></button>

      <div className="w-px h-8 bg-cyan-900/40 mx-1" />

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnStyle(editor.isActive('bulletList'))}><List size={18} /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnStyle(editor.isActive('orderedList'))}><ListOrdered size={18} /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnStyle(editor.isActive('blockquote'))}><Quote size={18} /></button>

      <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btnStyle(editor.isActive('codeBlock'))}><Code size={18} /></button>

      <div className="w-px h-8 bg-cyan-900/40 mx-1" />

      <button type="button" onClick={addLink} className={btnStyle(editor.isActive('link'))}><LinkIcon size={18} /></button>

      <button type="button" onClick={addImage} className="p-2 rounded-md bg-blue-700/60 hover:bg-blue-600 text-white shadow-md shadow-blue-500/40">
        <ImageIcon size={18} />
      </button>
    </div>
  );
};

// =======================
// 🌙 MAIN CREATE BLOG PAGE
// =======================
const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const navigate = useNavigate();
  const categories = ['Food', 'Cricket', 'News', 'Technology', 'Travel', 'Lifestyle'];
  const [category, setCategory] = useState(categories[0]);

  const editor = useEditor({
    extensions: [
      StarterKit, Underline, TiptapLink.configure({ openOnClick: false }),
      Image, TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editorProps: {
      attributes: {
        class: 'p-4 min-h-[400px] focus:outline-none text-slate-200',
      },
    },
  });

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  // SAME SUBMIT LOGIC (unchanged)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image.");

    const content = editor.getHTML();
    if (editor.isEmpty) return alert("Please write content.");

    setIsUploading(true);
    let imageUrl = '';

    try {
      const fd = new FormData();
      fd.append('imageFile', imageFile);

      const res = await axios.post(
        'https://zentry-blog-backend.onrender.com/posts/upload-image',
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${sessionStorage.getItem("User")}`,
          },
        }
      );

      imageUrl = res.data.imageUrl;
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
      setIsUploading(false);
      return;
    }

    try {
      const body = { title, description, content, imageUrl, category, isFeatured };
      const newPost = await createOnePost(body);

      alert("Blog Created!");
      navigate(`/read-blog/${newPost._id}`);
    } catch (err) {
      alert("Failed to create post.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-[#0A0B13] to-[#141A2F] text-white">

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-12">

        {/* CARD 1 */}
        <div className="bg-[#0F1525]/70 backdrop-blur-xl rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-500/20 p-10 space-y-6">
          <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Create New Blog Post
          </h2>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Your Title..."
            className="w-full text-2xl bg-[#0B1120] border border-cyan-900/40 rounded-lg p-3 focus:border-cyan-500 outline-none"
          />

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            required
            placeholder="Write a short description..."
            className="w-full bg-[#0B1120] border border-cyan-900/40 rounded-lg p-3 focus:border-cyan-500 outline-none"
          />

          <div className="border border-cyan-900/40 rounded-lg overflow-hidden bg-[#0A0F1D]">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />

            <style>{`
              .ProseMirror p.is-editor-empty:first-child::before {
                color: #64748b; 
                content: "Start writing here...";
                pointer-events: none;
              }
            `}</style>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-[#0F1525]/70 backdrop-blur-xl rounded-2xl border border-blue-900/30 shadow-xl shadow-blue-500/20 p-10 space-y-6">
          <h2 className="text-2xl font-serif font-bold text-blue-400">Publishing Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* LEFT SIDE */}
            <div className="space-y-6">
              <div>
                <label className="text-sm text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0B1120] border border-blue-900/40 text-white rounded-lg p-3"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#0B1120]">{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="h-4 w-4 bg-[#0B1120] border-blue-900/40 rounded"
                />
                <label className="text-sm text-slate-300">Feature this post</label>
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="text-sm text-slate-300">Featured Image</label>

              <div className="mt-2 border-2 border-dashed border-slate-700 rounded-lg p-6 text-center bg-[#0A0F1D]">
                <label htmlFor="file-upload" className="cursor-pointer text-cyan-400 hover:text-cyan-300">
                  Upload a file
                  <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
                <p className="text-xs text-slate-500 mt-2">PNG, JPG, GIF (max 10MB)</p>
              </div>

              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  className="mt-4 rounded-lg border border-slate-700 shadow-lg"
                  alt="preview"
                />
              )}
            </div>
          </div>

          <div className="text-right pt-6 border-t border-slate-800">
            <button
              type="submit"
              disabled={isUploading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/40 text-white font-semibold hover:scale-105 transition"
            >
              {isUploading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default CreateBlog;
