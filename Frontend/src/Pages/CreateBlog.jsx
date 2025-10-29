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

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  
  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
        editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b border-slate-300 p-2 flex flex-wrap gap-1 bg-slate-50">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('bold') ? 'bg-orange-600' : 'bg-orange-400'}`}><Bold size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('italic') ? 'bg-orange-600' : 'bg-orange-400'}`}><Italic size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('underline') ? 'bg-orange-600' : 'bg-orange-400'}`}><UnderlineIcon size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('strike') ? 'bg-orange-600' : 'bg-orange-400'}`}><Strikethrough size={18} /></button>
      <div className="w-px h-8 bg-slate-300 mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-orange-600' : 'bg-orange-400'}`}><Heading1 size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-orange-600' : 'bg-orange-400'}`}><Heading2 size={18} /></button>
      <div className="w-px h-8 bg-slate-300 mx-1" />
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-orange-600' : 'bg-orange-400'}`}><AlignLeft size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-orange-600' : 'bg-orange-400'}`}><AlignCenter size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-orange-600' : 'bg-orange-400'}`}><AlignRight size={18} /></button>
      <div className="w-px h-8 bg-slate-300 mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('bulletList') ? 'bg-orange-600' : 'bg-orange-400'}`}><List size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('orderedList') ? 'bg-orange-600' : 'bg-orange-400'}`}><ListOrdered size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('blockquote') ? 'bg-orange-600' : 'bg-orange-400'}`}><Quote size={18} /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('codeBlock') ? 'bg-orange-600' : 'bg-orange-400'}`}><Code size={18} /></button>
      <div className="w-px h-8 bg-slate-300 mx-1" />
      <button type="button" onClick={addLink} className={`p-2 rounded text-white hover:bg-orange-500 transition-colors ${editor.isActive('link') ? 'bg-orange-600' : 'bg-orange-400'}`}><LinkIcon size={18} /></button>
      <button type="button" onClick={addImage} className="p-2 rounded text-white bg-orange-400 hover:bg-orange-500 transition-colors"><ImageIcon size={18} /></button>
    </div>
  );
};

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
        class: 'p-4 min-h-[400px] focus:outline-none',
      },
    },
  });

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select a featured image for your post.");
      return;
    }
    
    const content = editor.getHTML();
    if (editor.isEmpty) {
      alert("Please write some content for your post.");
      return;
    }

    setIsUploading(true);
    let imageUrl = '';
    try {
      const formData = new FormData();
      formData.append('imageFile', imageFile); 
      
      const response = await axios.post('http://localhost:3004/posts/upload-image', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${sessionStorage.getItem("User")}` 
        }
      });
      imageUrl = response.data.imageUrl;

    } catch (error) {
  console.error("Error uploading image:", error);
  console.error("Error response:", error.response?.data);
  alert(`Image upload failed: ${error.response?.data?.message || error.message}`);
  setIsUploading(false);
  return;
} 
    

    try {
      const blogobject = { title, description, content, imageUrl, category, isFeatured };

      const newPost = await createOnePost(blogobject);
      
      alert("Blog Created Successfully");
      navigate(`/read-blog/${newPost._id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="min-h-screen pt-28 pb-12 px-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 z-40">

        <div className="bg-slate-50 rounded-xl shadow-lg p-8 space-y-6">
          <h2 className=" text-xl md:text-3xl font-extrabold font-serif text-purple-900 border-b pb-4">Create New Blog Post</h2>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Your Title...."
            className="w-full text-lg md:text-2xl font-bold font-serif border-0 border-b-2 border-slate-200 focus:ring-0 focus:border-purple-500 transition-colors py-2"
          />
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            required
            placeholder="Write a short, engaging description..."
            className="block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-lg"
          />
          <div className="border border-slate-300 rounded-md overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <style>{`
              .ProseMirror { min-height: 400px; outline: none; padding: 1rem; }
              .ProseMirror p.is-editor-empty:first-child::before { color: #9ca3af; content: "Start writing your article here..."; float: left; height: 0; pointer-events: none; }
              .ProseMirror > * + * { margin-top: 0.75em; }
              .ProseMirror ul, .ProseMirror ol { padding: 0 1.5rem; margin: 1rem 0; }
              .ProseMirror ul { list-style-type: disc; }
              .ProseMirror ol { list-style-type: decimal; }
              .ProseMirror img { max-width: 100%; height: auto; display: block; margin: 1rem 0; border-radius: 0.5rem; }
              .ProseMirror h1 { font-size: 2em; font-weight: bold; margin: 0.5em 0; }
              .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin: 0.5em 0; }
              .ProseMirror blockquote { padding-left: 1rem; border-left: 3px solid #cbd5e1; margin: 1rem 0; }
              .ProseMirror code { background-color: #f1f5f9; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
              .ProseMirror pre { background: #1e293b; color: #f1f5f9; padding: 0.75rem 1rem; border-radius: 0.5rem; overflow-x: auto; }
              .ProseMirror pre code { background: none; color: inherit; padding: 0; }
            `}</style>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold font-serif text-slate-800 border-b pb-4">Publishing & Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="block w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white">
                  {categories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>
              <div className="flex items-center">
                <input id="isFeatured" type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">Feature this post</label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Featured Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <div className="flex text-sm text-slate-600"><label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-orange-400 hover:text-orange-600"><span>Upload a file</span><input id="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} required /></label><p className="pl-1">or drag and drop</p></div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {imageFile && <div className="mt-4"><p className="text-sm font-medium text-slate-700">Preview:</p><img src={URL.createObjectURL(imageFile)} alt="Preview" className="mt-2 rounded-md shadow-md w-full" /></div>}
            </div>
          </div>
          <div className="pt-6 text-right border-t">
            <button type="submit" disabled={isUploading} className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-slate-400">
              {isUploading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;