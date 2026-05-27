"use client";

import { useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPT =
  ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png";

export interface FileDropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  error?: string;
}

export function FileDropzone({
  files,
  onChange,
  maxFiles = 5,
  maxSizeMB = 5,
  error,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  function addFiles(incoming: File[]) {
    const merged = [...files];
    for (const f of incoming) {
      if (merged.length >= maxFiles) break;
      if (f.size > maxSizeMB * 1024 * 1024) continue;
      if (!merged.find((m) => m.name === f.name && m.size === f.size)) {
        merged.push(f);
      }
    }
    onChange(merged);
  }

  function removeAt(idx: number) {
    onChange(files.filter((_, i) => i !== idx));
  }

  return (
    <div className="grid gap-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          addFiles(Array.from(e.dataTransfer.files));
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-white px-6 py-9 text-center transition",
          over && "border-indigo/40 bg-indigo/5",
          error && "border-red-300"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => {
            const list = e.target.files ? Array.from(e.target.files) : [];
            if (list.length) addFiles(list);
            e.currentTarget.value = "";
          }}
        />
        <Upload className="size-7 text-indigo" aria-hidden />
        <div className="text-sm font-semibold text-ink">
          Drop files or <span className="text-indigo">browse</span>
        </div>
        <p className="text-xs text-muted-ink">
          PDF, DOCX, XLSX, JPG, PNG · max {maxFiles} files · {maxSizeMB} MB each
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-1 grid gap-2">
          {files.map((f, idx) => (
            <li
              key={`${f.name}-${idx}`}
              className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-3 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText className="size-4 shrink-0 text-indigo" />
                <span className="truncate text-ink">{f.name}</span>
                <span className="shrink-0 text-xs text-muted-ink">
                  {(f.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </span>
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-ink hover:bg-red-50 hover:text-red-600"
                aria-label={`Remove ${f.name}`}
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export default FileDropzone;
