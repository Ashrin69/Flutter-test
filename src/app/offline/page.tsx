import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <WifiOff className="w-24 h-24 text-muted-foreground/50 mb-4" />
      <h2 className="text-3xl font-bold font-headline mb-2">আপনি এখন অফলাইনে আছেন</h2>
      <p className="text-muted-foreground mb-6 max-w-sm">
        আপনার ইন্টারনেট সংযোগ বিচ্ছিন্ন রয়েছে। তবে চিন্তা নেই, এই অ্যাপের যে পৃষ্ঠাগুলো আপনি আগে দেখেছেন, সেগুলো অফলাইনেও কাজ করবে।
      </p>
    </main>
  );
}
