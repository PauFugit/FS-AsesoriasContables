'use client';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: `${window.location.origin}/auth/login` })}>
      <LogOut className="w-4 h-4 mr-2 text-custom-white" />
    </button>
  );
}
