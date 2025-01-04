import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";
import { compressImage } from "@/utils/imageCompression";

interface ImageUploadProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export const ImageUpload = ({ onUpload, isUploading }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [compressionInfo, setCompressionInfo] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    setPreviewUrls([]); // Clear existing previews
    setCompressionInfo([]); // Clear existing compression info
    
    for (const file of imageFiles) {
      const originalSize = (file.size / 1024 / 1024).toFixed(2);
      const compressedFile = await compressImage(file);
      const compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2);
      
      setCompressionInfo(prev => [
        ...prev,
        `${file.name}: ${originalSize}MB → ${compressedSize}MB`
      ]);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result as string]);
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

    const { files } = e.dataTransfer;
    if (files?.length) handleFiles(files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) handleFiles(files);
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
          {previewUrls.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {previewUrls.map((url, index) => (
                  <img 
                    key={index}
                    src={url} 
                    alt={`Preview ${index + 1}`} 
                    className="h-20 w-20 object-cover rounded"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                {compressionInfo.map((info, index) => (
                  <p key={index}>{info}</p>
                ))}
              </div>
            </div>
          ) : (
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          )}
          
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Drag and drop your images here, or click to select multiple files
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
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
                'Select Images'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};