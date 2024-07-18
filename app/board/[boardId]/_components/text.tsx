import { useMutation } from '@liveblocks/react/suspense';
import { Kalam } from 'next/font/google';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { cn, colorToCss } from '@/lib/utils';
import { TextLayer } from '@/types/canvas';


const font = Kalam({
  subsets: ['latin'],
  weight: ['400'],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnWidth = width * scaleFactor;
  const fontSizeBasedOnHeight = height * scaleFactor;

  return Math.min(fontSizeBasedOnWidth, fontSizeBasedOnHeight, maxFontSize);
}

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
};


export const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation((
    { storage },
    newValue: string
  ) => {
    const liveLayers = storage.get('layers');
    liveLayers.get(id)?.set('value', newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
      }}
    >
      <ContentEditable 
        html={value || 'Text'}
        onChange={handleContentChange}
        className={cn(
          'w-full h-full flex justify-center items-center text-center drop-shadow-md outline-none',
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? colorToCss(fill) : '#000',
        }}
      />
    </foreignObject>
  );
};