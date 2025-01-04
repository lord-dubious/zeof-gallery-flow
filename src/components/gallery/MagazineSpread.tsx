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
          alt={leftImage.magazine_title || 'Gallery image'}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Error loading image:', leftImage.url);
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        {(leftImage.magazine_title || leftImage.description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 md:p-8">
            {leftImage.magazine_title && (
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-2">
                {leftImage.magazine_title}
              </h3>
            )}
            {leftImage.description && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-3xl">
                {leftImage.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};