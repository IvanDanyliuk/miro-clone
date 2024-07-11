'use client';

import { useState } from 'react';
import { CanvasMode, CanvasState } from '@/types/canvas';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import { useCanRedo, useCanUndo, useHistory } from '@liveblocks/react/suspense';


interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canUdo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main className='w-full h-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar 
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUdo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
};