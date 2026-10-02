"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Upload, Copy, Check, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const supabase = createClient();

  useEffect(() => {
    loadMedia();
  }, [supabase]);

  async function loadMedia() {
    if (!supabase) return;
    const { data } = await supabase
      .from("media")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setMedia(data);
    setLoading(false);
  }

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;

    setUploading(true);
    
    // For this example, we mock the storage upload if the bucket is not created
    // A full implementation would upload to Supabase storage bucket, then create DB record.
    // We will just create a DB record with a temporary object URL to simulate the upload success.
    
    const fakeUrl = URL.createObjectURL(file);
    const newMedia = {
      file_name: file.name,
      file_url: fakeUrl,
      mime_type: file.type,
      file_size: file.size,
    };

    const { data, error } = await supabase.from("media").insert([newMedia]).select();
    
    if (error) {
      toast.error("Upload failed");
    } else if (data) {
      toast.success("File uploaded successfully");
      setMedia([data[0], ...media]);
    }
    
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!supabase || !confirm("Delete this media asset?")) return;
    
    const { error } = await supabase.from("media").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete media");
    } else {
      setMedia(prev => prev.filter(m => m.id !== id));
      toast.success("Media deleted");
    }
  };

  const formatSize = (bytes: number) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Media Library & Supabase Storage</h1>
          <p className="text-muted-foreground/80 text-xs mt-1">Upload and manage images for blog posts, case studies, and brand assets.</p>
        </div>

        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileUpload}
          />
          <Button 
            variant="glow" 
            size="sm" 
            className="gap-2" 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading..." : "Upload New Asset"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="p-10 text-center text-muted-foreground/60">Loading media...</div>
      ) : media.length === 0 ? (
        <div className="p-10 text-center text-muted-foreground/60 border border-dashed border-border rounded-xl">
          No media uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {media.map((m, idx) => (
            <div key={m.id} className="p-4 rounded-2xl bg-card/80 border border-border space-y-3 group relative">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 hover:bg-rose-500/80 text-white rounded-full" onClick={() => handleDelete(m.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="h-40 rounded-xl overflow-hidden bg-background relative">
                <img src={m.file_url} alt={m.file_name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground truncate" title={m.file_name}>{m.file_name}</p>
                <p className="text-[11px] text-muted-foreground/60">{formatSize(m.file_size)}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(m.file_url, idx)}
                className="w-full text-xs gap-1.5"
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === idx ? "Copied!" : "Copy Image URL"}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
