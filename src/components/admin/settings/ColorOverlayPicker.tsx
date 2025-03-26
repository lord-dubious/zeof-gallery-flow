
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/hooks/use-theme";
import { EyeDropper } from "lucide-react";

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
    "#660066",  // Dark purple
    "#896B41", // Gold/Brown
    "#5C4A28", // Dark Gold
    "#2D5F5D", // Teal
    "#3D284C"  // Deep Purple
  ];

  return (
    <Card className={`p-5 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
      <div className="space-y-5">
        <div>
          <Label htmlFor="color-picker" className="block mb-3 flex items-center">
            <EyeDropper className="h-4 w-4 mr-2" /> 
            Overlay Color
          </Label>
          <div className="flex items-center space-x-3 mb-3">
            <div 
              className="w-12 h-12 rounded-lg border shadow-sm"
              style={{ backgroundColor: color }}
            />
            <div className="flex-1">
              <input
                id="color-picker"
                type="color"
                value={color}
                onChange={handleColorChange}
                className="h-10 w-full cursor-pointer rounded"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 px-2 py-1 rounded border text-sm font-mono">
              {color.toUpperCase()}
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mt-3">
            {colorOptions.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                className={`w-8 h-8 rounded-full border transition-all transform hover:scale-110 ${color === colorOption ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''}`}
                style={{ backgroundColor: colorOption }}
                onClick={() => onColorChange(colorOption)}
                title={colorOption}
              />
            ))}
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
          <Label htmlFor="opacity-slider" className="block mb-3">
            Overlay Opacity: {Math.round(opacity * 100)}%
          </Label>
          <div className="px-2">
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
          
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Transparent</span>
            <span className="text-xs text-gray-500">Solid</span>
          </div>
          
          <div className="mt-4 p-3 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
            <div className="flex space-x-2">
              <div className="flex-1 h-6 bg-gradient-to-r from-transparent to-[#000000] rounded" />
              <div className="text-sm font-mono">{Math.round(opacity * 100)}%</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
