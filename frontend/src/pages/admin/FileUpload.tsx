import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/api";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  /** show an image preview of the current value */
  preview?: boolean;
}

/** URL input + upload button. Uploading sets the field to the returned URL. */
export const FileUpload = ({ value, onChange, accept = "image/*", preview = true }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = () => inputRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const { url } = await uploadFile(file);
      onChange(url);
    } catch {
      setError("Upload impossible (API lancée ?)");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL ou téléverser →" />
        <Button type="button" variant="outline" onClick={pick} disabled={busy} className="shrink-0 gap-2">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Téléverser
        </Button>
        <input ref={inputRef} type="file" accept={accept} onChange={onFile} className="hidden" />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {preview && value && accept.startsWith("image") && (
        <img src={value} alt="" className="h-24 w-40 rounded-md border border-border object-cover" />
      )}
    </div>
  );
};
