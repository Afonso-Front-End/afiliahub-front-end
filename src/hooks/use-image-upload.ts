import { useState } from "react";
import { uploadCmsImage } from "@/api/cms";

export function useImageUpload(onChange: (url: string) => void) {
  const [uploading, setUploading] = useState(false);
  const [fileType, setFileType] = useState<string | undefined>();

  const handleFile = async (file: File | null) => {
    if (!file) return;
    setFileType(file.type);
    setUploading(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1] ?? "");
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const { url } = await uploadCmsImage({ data: { fileName: file.name, base64 } });
      onChange(url);
    } finally {
      setUploading(false);
    }
  };

  return { uploading, fileType, handleFile };
}
