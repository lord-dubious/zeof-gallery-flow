interface MagazineCoverProps {
  isBack?: boolean;
}

export const MagazineCover = ({ isBack }: MagazineCoverProps) => {
  return (
    <div className="hard relative bg-zeof-black text-white h-full">
      {isBack ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="ZEOF Logo"
            className="w-24 h-24 opacity-50"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">ZEOF Collection</h1>
          <p className="text-lg md:text-xl font-light">A Journey Through Elegance</p>
        </div>
      )}
    </div>
  );
};