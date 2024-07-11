'use client';

import { useCallback, useState } from 'react';
import { useCanRedo, useCanUndo, useHistory, useMutation } from '@liveblocks/react/suspense';
import { Camera, CanvasMode, CanvasState } from '@/types/canvas';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import { CursorsPresence } from './cursors-presence';
import { pointerEventToCanvasPoint } from '@/lib/utils';


interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUdo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, []);

  const onPointerMove = useMutation((
    { setMyPresence }, 
    e: React.PointerEvent
  ) => {
    e.preventDefault();

    const current = pointerEventToCanvasPoint(e, camera);

    setMyPresence({ cursor: current });
  }, []);

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

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
      <svg 
        className='w-[100vw] h-[100vh]'
        onWheel={onWheel}
        onPointerMove={onPointerMove} 
        onPointerLeave={onPointerLeave} 
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};