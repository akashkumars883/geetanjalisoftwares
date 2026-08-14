"use client";

import { useRef } from "react";
import { 
  Heading1, 
  Heading2, 
  Heading3, 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link as LinkIcon, 
  Image as ImageIcon 
} from "lucide-react";

export default function RichTextEditor({ value, onChange, placeholder = "Write your content here...", rows = 14 }) {
  const textareaRef = useRef(null);

  const insertFormat = (prefix, suffix = "", defaultText = "Text Here") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || defaultText;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newValue = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { label: "H1", icon: Heading1, action: () => insertFormat("\n# ", "\n", "Heading 1"), title: "Main Heading (H1)" },
    { label: "H2", icon: Heading2, action: () => insertFormat("\n## ", "\n", "Section Heading"), title: "Subheading (H2)" },
    { label: "H3", icon: Heading3, action: () => insertFormat("\n### ", "\n", "Subsection Title"), title: "Minor Heading (H3)" },
    { type: "divider" },
    { label: "Bold", icon: Bold, action: () => insertFormat("**", "**", "Bold Text"), title: "Bold" },
    { label: "Italic", icon: Italic, action: () => insertFormat("*", "*", "Italic Text"), title: "Italic" },
    { type: "divider" },
    { label: "Bullet List", icon: List, action: () => insertFormat("\n- ", "\n- Item 2\n- Item 3", "List Item 1"), title: "Bullet List" },
    { label: "Numbered List", icon: ListOrdered, action: () => insertFormat("\n1. ", "\n2. Item 2\n3. Item 3", "First Item"), title: "Numbered List" },
    { type: "divider" },
    { label: "Quote", icon: Quote, action: () => insertFormat("\n> ", "\n", "Important Quote or Key Insight"), title: "Blockquote" },
    { label: "Code", icon: Code, action: () => insertFormat("\n```javascript\n", "\n```", "// Code snippet here"), title: "Code Block" },
    { label: "Link", icon: LinkIcon, action: () => insertFormat("[", "](https://geetanjalisoftwares.com)", "Clickable Link Text"), title: "Hyperlink" },
    { label: "Image", icon: ImageIcon, action: () => insertFormat("![", "](https://images.unsplash.com/photo-1498050108023-c5249f4df085)", "Image Description"), title: "Embed Image" },
  ];

  return (
    <div className="w-full border border-stone-200 rounded-md overflow-hidden bg-stone-50">
      {/* Editor Formatting Toolbar */}
      <div className="p-2.5 bg-stone-100/90 border-b border-stone-200 flex flex-wrap items-center gap-1.5 selection:bg-none">
        {toolbarButtons.map((btn, index) => {
          if (btn.type === "divider") {
            return <div key={index} className="h-4 w-px bg-stone-300 mx-1" />;
          }

          const Icon = btn.icon;
          return (
            <button
              key={btn.label}
              type="button"
              onClick={btn.action}
              title={btn.title}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white border border-stone-200 text-xs font-semibold text-stone-700 hover:text-black hover:border-stone-400 hover:bg-stone-50 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Icon className="h-3.5 w-3.5 text-stone-600" />
              <span className="text-[11px]">{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* Textarea Input */}
      <textarea
        ref={textareaRef}
        required
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white p-4 text-xs font-mono text-stone-900 focus:outline-none transition-colors resize-y leading-relaxed"
      />
    </div>
  );
}
