'use client';
import { Button } from '@/components/ui/button';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const createFiles = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles, orgId ? { orgId } : 'skip');
  return (
    <main className='flex justify-center items-center'>
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button
        onClick={() => {
          if (!orgId) return;
          createFiles({
            name: 'Hello world',
            orgId,
          });
        }}
      >
        Click me
      </Button>
    </main>
  );
}

/*
<SignedIn>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
*/
