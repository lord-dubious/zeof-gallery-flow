import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import { compressImage } from "@/utils/imageCompression";

interface ImageUploadProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export const ImageUpload = ({ onUpload, isUploading }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const originalSize = (file.size / 1024 / 1024).toFixed(2);
      const compressedFile = await compressImage(file);
      const compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2);
      
      setCompressionInfo(
        `Original: ${originalSize}MB → Compressed: ${compressedSize}MB`
      );
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);
      
      onUpload(compressedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={`border-2 border-dashed ${dragActive ? 'border-primary' : 'border-gray-300'}`}>
      <CardContent className="p-6">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="text-center"
        >
          {previewUrl ? (
            <div className="space-y-4">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-40 mx-auto rounded"
              />
              {compressionInfo && (
                <p className="text-sm text-gray-500">{compressionInfo}</p>
              )}
            </div>
          ) : (
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          )}
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Drag and drop your image here, or click to select
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              disabled={isUploading}
              className="hidden"
            />
            <Button 
              type="button" 
              variant="outline" 
              disabled={isUploading}
              onClick={handleButtonClick}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                'Select Image'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};