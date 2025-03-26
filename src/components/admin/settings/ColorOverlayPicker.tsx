
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/hooks/use-theme";

interface ColorOverlayPickerProps {
  color: string;
  opacity: number;
  onColorChange: (color: string) => void;
  onOpacityChange: (opacity: number) => void;
}

export const ColorOverlayPicker = ({
  color,
  opacity,
  onColorChange,
  onOpacityChange
}: ColorOverlayPickerProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
  };
  
  const handleOpacityChange = (value: number[]) => {
    onOpacityChange(value[0]);
  };
  
  // Predefined color options
  const colorOptions = [
    "#000000", // Black
    "#FFFFFF", // White
    "#1A1A1A", // Dark gray
    "#333333", // Medium gray
    "#193366", // Navy
    "#662211", // Dark red
    "#114422", // Dark green
    "#333366", // Dark blue
    "#660066"  // Dark purple
  ];

  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-700 border-gray-600' : ''}`}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="color-picker" className="block mb-2">Overlay Color</Label>
          <div className="flex items-center space-x-2">
            <div 
              className="w-10 h-10 rounded border"
              style={{ backgroundColor: color }}
            />
            <input
              id="color-picker"
              type="color"
              value={color}
              onChange={handleColorChange}
              className="h-10 w-16 cursor-pointer"
            />
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                className={`w-6 h-6 rounded-full border ${color === colorOption ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                style={{ backgroundColor: colorOption }}
                onClick={() => onColorChange(colorOption)}
                title={colorOption}
              />
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="opacity-slider" className="block mb-2">
            Overlay Opacity: {Math.round(opacity * 100)}%
          </Label>
          <Slider
            id="opacity-slider"
            defaultValue={[opacity]}
            max={1}
            step={0.01}
            value={[opacity]}
            onValueChange={handleOpacityChange}
            className={isDark ? 'bg-gray-600' : ''}
          />
        </div>
      </div>
    </Card>
  );
};
