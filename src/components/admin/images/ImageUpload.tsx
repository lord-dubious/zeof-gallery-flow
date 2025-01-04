import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload } from "lucide-react";

interface ImageUploadProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export const ImageUpload = ({ onUpload, isUploading }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

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
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
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
          <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Drag and drop your image here, or click to select
            </p>
            <Label htmlFor="image-upload" className="cursor-pointer">
              <Input
                id="image-upload"
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
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};