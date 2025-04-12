import { useResumeStore } from "@/lib/resumeStore";
import { colorSchemes } from "@/lib/colors";

export default function ColorSchemeSelector() {
  const { colorScheme, setColorScheme } = useResumeStore();

  const handleColorSelect = (colorId: string) => {
    setColorScheme(colorId);
  };

  return (
    <section className="mb-12 no-print">
      <h2 className="text-2xl font-semibold font-sans mb-6 text-foreground">Select Color Scheme</h2>
      <div className="flex flex-wrap gap-4">
        {colorSchemes.map((color) => (
          <div
            key={color.id}
            className={`color-scheme-option cursor-pointer p-1 border-2 rounded-md transition-all duration-200 ${
              colorScheme === color.id ? 'border-primary' : 'border-transparent hover:border-primary'
            }`}
            data-scheme={color.id}
            onClick={() => handleColorSelect(color.id)}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full bg-${color.id}-600`}
                style={{ backgroundColor: color.hex }}
              ></div>
              <span className="mt-2 text-sm">{color.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
