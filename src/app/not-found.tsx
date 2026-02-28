import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <Frown className="w-24 h-24 text-muted-foreground/50 mb-4" />
      <h2 className="text-3xl font-bold font-headline mb-2">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h2>
      <p className="text-muted-foreground mb-6">আপনি যে পৃষ্ঠাটি খুঁজছেন তার অস্তিত্ব নেই।</p>
      <Button asChild>
        <Link href="/">হোম পেজে ফিরে যান</Link>
      </Button>
    </main>
  );
}
