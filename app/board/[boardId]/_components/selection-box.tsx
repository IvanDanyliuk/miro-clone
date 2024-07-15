'use client';

import { memo } from 'react';
import { useSelf, useStorage } from '@liveblocks/react/suspense';
import { useSelectionBounds } from '@/hooks/use-selection-bounds';
import { SELECTION_BOX_HANDLE_WIDTH } from '@/lib/constants';
import { LayerType, Side, XYWH } from '@/types/canvas';


interface SelectionBoxProps {
  onResizeHandleOinterDown: (corner: Side, initialBounds: XYWH) => void;
};


export const SelectionBox = memo(({
  onResizeHandleOinterDown
}: SelectionBoxProps) => {
  const soleLayerId = useSelf((me) => 
    me.presence.selection.length === 1 ? me.presence.selection[0] : null
  );

  const isShowingHandles = useStorage((root) => 
    soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
  );

  const bounds = useSelectionBounds();

  if(!bounds) {
    return null;
  }

  return (
    <>
      <rect 
        className='fill-transparent stroke-blue-500 stroke-1 pointer-events-none'
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
          <rect 
            className='fill-white stroke-1 stroke-blue-500'
            x={0}
            y={0}
            style={{
              cursor: 'nwse-resize',
              width: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              height: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - SELECTION_BOX_HANDLE_WIDTH / 2}px, ${bounds.y - SELECTION_BOX_HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleOinterDown(Side.Top + Side.Left, bounds);
            }}
          />
          <rect 
            className='fill-white stroke-1 stroke-blue-500'
            x={0}
            y={0}
            style={{
              cursor: 'ns-resize',
              width: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              height: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x + bounds.width / 2 - SELECTION_BOX_HANDLE_WIDTH / 2}px, ${bounds.y - SELECTION_BOX_HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleOinterDown(Side.Top, bounds);
            }}
          />
          <rect 
            className='fill-white stroke-1 stroke-blue-500'
            x={0}
            y={0}
            style={{
              cursor: 'nesw-resize',
              width: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              height: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - SELECTION_BOX_HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - SELECTION_BOX_HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleOinterDown(Side.Top + Side.Right, bounds);
            }}
          />
          <rect 
            className='fill-white stroke-1 stroke-blue-500'
            x={0}
            y={0}
            style={{
              cursor: 'ew-resize',
              width: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              height: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - SELECTION_BOX_HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y + bounds.height / 2 - SELECTION_BOX_HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleOinterDown(Side.Right, bounds);
            }}
          />
          <rect 
            className='fill-white stroke-1 stroke-blue-500'
            x={0}
            y={0}
            style={{
              cursor: 'nwse-resize',
              width: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              height: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - SELECTION_BOX_HANDLE_WIDTH / 2 + bounds.width}px, ${bounds.y - SELECTION_BOX_HANDLE_WIDTH / 2 + bounds.height}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleOinterDown(Side.Bottom + Side.Right, bounds);
            }}
          />
          <rect 
            className='fill-white stroke-1 stroke-blue-500'
            x={0}
            y={0}
            style={{
              cursor: 'ns-resize',
              width: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              height: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x + bounds.width / 2 - SELECTION_BOX_HANDLE_WIDTH / 2}px, ${bounds.y - SELECTION_BOX_HANDLE_WIDTH / 2 + bounds.height}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleOinterDown(Side.Bottom, bounds);
            }}
          />
          <rect 
            className='fill-white stroke-1 stroke-blue-500'
            x={0}
            y={0}
            style={{
              cursor: 'nesw-resize',
              width: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              height: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - SELECTION_BOX_HANDLE_WIDTH / 2}px, ${bounds.y - SELECTION_BOX_HANDLE_WIDTH / 2 + bounds.height}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleOinterDown(Side.Bottom + Side.Left, bounds);
            }}
          />
          <rect 
            className='fill-white stroke-1 stroke-blue-500'
            x={0}
            y={0}
            style={{
              cursor: 'ew-resize',
              width: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              height: `${SELECTION_BOX_HANDLE_WIDTH}px`,
              transform: `translate(${bounds.x - SELECTION_BOX_HANDLE_WIDTH / 2}px, ${bounds.y - SELECTION_BOX_HANDLE_WIDTH / 2 + bounds.height / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleOinterDown(Side.Left, bounds);
            }}
          />
        </>
      )}
    </>
  );
});

SelectionBox.displayName = 'SelectionBox';