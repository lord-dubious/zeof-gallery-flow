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
      </div>
    </div>
  );
};