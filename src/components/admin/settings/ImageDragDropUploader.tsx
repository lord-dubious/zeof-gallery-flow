
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";
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
      className={`border-2 border-dashed transition-colors duration-200 ${dragActive 
        ? 'border-primary bg-primary/5' 
        : isDark 
          ? 'border-gray-600 bg-gray-700/50' 
          : 'border-gray-200 bg-gray-50'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="p-6 text-center">
        <div className={`rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center ${dragActive 
          ? 'bg-primary/10' 
          : isDark 
            ? 'bg-gray-600' 
            : 'bg-gray-100'}`}>
          <Upload className={`h-8 w-8 ${dragActive 
            ? 'text-primary' 
            : isDark 
              ? 'text-gray-300' 
              : 'text-gray-400'}`} />
        </div>
        
        <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
          {dragActive ? 'Drop Your Image Here' : 'Upload Hero Image'}
        </h4>
        
        <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
          Drag and drop an image here, or click to select
        </p>
        
        <p className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
          Supported formats: JPG, PNG, WebP • Max size: 5MB
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
          className={`px-6 ${isDark 
            ? 'bg-gray-600 border-gray-500 hover:bg-gray-500' 
            : 'bg-white'}`}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Select Image
        </Button>
      </div>
    </Card>
  );
};
