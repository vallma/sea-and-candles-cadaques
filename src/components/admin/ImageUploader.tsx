"use client";
import { useRef, useState } from "react";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
}

export default function ImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const fd = new FormData();
    for (const f of files) fd.append("files", f);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    onChange([...value, ...data.urls]);
    setUploading(false);
  }

  function remove(url: string) {
    onChange(value.filter((u) => u !== url));
  }

  return (
    <div className="space-y-3">
      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {value.map((url) => (
            <div key={url} className="relative group aspect-square">
              <img src={url} alt="" className="w-full h-full object-cover rounded" />
              <button type="button" onClick={() => remove(url)}
                className="absolute top-1 right-1 bg-black/70 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        className="w-full border-2 border-dashed border-slate-200 rounded-lg py-8 text-center text-sm text-slate-400 hover:border-blue-300 hover:text-blue-400 transition-colors cursor-pointer"
      >
        {uploading ? "Pujant..." : "Arrossega imatges aquí o clica per seleccionar"}
      </button>
      <input ref={inputRef} type="file" multiple accept="image/*" className="hidden"
        onChange={(e) => handleFiles(e.target.files)} />
    </div>
  );
}
