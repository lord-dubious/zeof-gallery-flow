import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, X } from "lucide-react";
import type { Image } from "../types/images";

interface ImagePreviewProps {
  image: Image;
}

export const ImagePreview = ({ image }: ImagePreviewProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative aspect-square mb-2 group">
        <img 
          src={image.thumbnail_url || image.url} 
          alt={image.title || 'Preview'}
          className="w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white"
            onClick={() => setIsOpen(true)}
          >
            <Maximize2 className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img 
              src={image.url} 
              alt={image.title || 'Full size preview'}
              className="w-full h-auto rounded"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};