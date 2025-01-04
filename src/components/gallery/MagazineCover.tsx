interface MagazineCoverProps {
  isBack?: boolean;
}

export const MagazineCover = ({ isBack }: MagazineCoverProps) => {
  return (
    <div className="hard relative bg-gradient-to-br from-zeof-black to-zeof-brown text-white h-full shadow-lg">
      {isBack ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <img
            src="/logo.png"
            alt="ZEOF Logo"
            className="w-32 h-32 opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/20">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-wide">
            ZEOF Collection
          </h1>
          <div className="w-24 h-0.5 bg-zeof-gold mb-6"></div>
          <p className="text-lg md:text-xl font-light tracking-wider text-zeof-cream/90">
            A Journey Through Elegance
          </p>
        </div>
      )}
    </div>
  );
};