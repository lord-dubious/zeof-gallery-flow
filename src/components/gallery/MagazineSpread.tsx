import type { Image } from "@/components/admin/types/images";

interface MagazineSpreadProps {
  images: Image[];
}

export const MagazineSpread = ({ images }: MagazineSpreadProps) => {
  return (
    <div className="p-8 bg-white flex">
      {images.map((image, index) => (
        <div key={image.id} className="flex-1 p-4">
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
      ))}
    </div>
  );
};