import type { Image } from "@/components/admin/types/images";

interface MagazineSpreadProps {
  leftImage: Image;
  rightImage?: Image;
}

export const MagazineSpread = ({ leftImage }: MagazineSpreadProps) => {
  return (
    <div className="h-full w-full relative">
      <div className="absolute inset-0">
        <img
          src={leftImage.url}
          alt={leftImage.title || 'Gallery image'}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Error loading image:', leftImage.url);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        {leftImage.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
            <h3 className="text-lg md:text-xl font-serif">{leftImage.title}</h3>
            {leftImage.description && (
              <p className="text-sm md:text-base mt-1 text-white/90">{leftImage.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};