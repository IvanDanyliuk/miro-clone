'use client';

import Image from 'next/image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { useOrganization } from '@clerk/nextjs';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';


export const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if(!organization) return;

    mutate({
      orgId: organization.id,
      title: 'Untitled'
    })
      .then((id) => {
        toast.success('Board created');
        // TODO: Redirect tp /board/{id}
      })
      .catch(() => {
        toast.error('Failed to create board');
      });
  };

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <Image 
        src='/note.svg'
        alt='Empty'
          width={110}
          height={110}
      />
      <h2 className='text-2xl font-semibold mt-6'>
        Create your first board!
      </h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization
      </p>
      <div className='mt-2'>
        <Button disabled={pending} size='lg' onClick={onClick}>
          Create board
        </Button>
      </div>
    </div>
  )
}