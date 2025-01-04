import type { Image } from "@/components/admin/types/images";

interface MagazineSpreadProps {
  leftImage: Image;
  rightImage?: Image;
}

export const MagazineSpread = ({ leftImage, rightImage }: MagazineSpreadProps) => {
  const renderPage = (image: Image) => (
    <div className="flex-1 p-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
        <img
          src={image.url}
          alt={image.title || 'Gallery image'}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Error loading image:', image.url);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white text-lg font-serif">
            {image.title || 'Untitled'}
          </h3>
          {image.description && (
            <p className="text-white/80 text-sm">{image.description}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper flex bg-white">
      {renderPage(leftImage)}
      {rightImage && renderPage(rightImage)}
    </div>
  );
};