
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface ImageDragDropUploaderProps {
  onUpload: (file: File) => void;
}

export const ImageDragDropUploader = ({ onUpload }: ImageDragDropUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onUpload(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Card 
      className={`border-2 border-dashed ${dragActive ? 'border-primary' : 'border-gray-300'} ${isDark ? 'bg-gray-700' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="p-6 text-center">
        <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
        
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'} mb-4`}>
          Drag and drop an image here, or click to select
        </p>
        
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        <Button 
          variant="outline" 
          onClick={handleButtonClick}
          className={isDark ? 'bg-gray-600 border-gray-500 hover:bg-gray-500' : ''}
        >
          Select Image
        </Button>
      </div>
    </Card>
  );
};
