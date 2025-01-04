import type { Image } from "@/components/admin/types/images";

interface MagazineSpreadProps {
  leftImage: Image;
  rightImage?: Image;
}

export const MagazineSpread = ({ leftImage }: MagazineSpreadProps) => {
  return (
    <div className="h-full w-full">
      <div className="relative h-full w-full">
        <img
          src={leftImage.url}
          alt={leftImage.title || 'Gallery image'}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Error loading image:', leftImage.url);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-lg font-serif">
            {leftImage.title || 'Untitled'}
          </h3>
          {leftImage.description && (
            <p className="text-white/80 text-sm">{leftImage.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};