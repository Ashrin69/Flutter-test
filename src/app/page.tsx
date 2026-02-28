'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { philosophySubjects } from '@/lib/database';
import { Card, CardContent } from '@/components/ui/card';
import { BookMarked, ChevronRight, Search, Github } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubjects = useMemo(() => {
    if (!searchTerm) {
      return philosophySubjects;
    }
    return philosophySubjects.filter(
      (subject) =>
        subject.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.subjectCode.includes(searchTerm)
    );
  }, [searchTerm]);

  return (
    <div className="flex flex-col flex-grow min-h-screen">
      <header className="p-4 border-b border-white/10 dark:border-white/5 shrink-0 backdrop-blur-2xl sticky top-0 z-10 bg-card/50 dark:bg-card/40">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <BookMarked className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-headline text-foreground">
                  Philosophy
                </h1>
                <p className="text-xs text-muted-foreground">Select a Subject</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="বিষয় বা কোড দিয়ে খুঁজুন..."
              className="pl-11 w-full bg-transparent border-white/20 dark:border-white/10 placeholder:text-muted-foreground/80 rounded-full h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 overflow-y-auto">
        <div className="grid grid-cols-1 gap-3">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <Link key={subject.subjectCode} href={`/subject/${subject.subjectCode}`} className="block">
                <Card className="h-full transition-all duration-300 bg-card/20 dark:bg-card/10 backdrop-blur-2xl border border-white/10 hover:border-white/30 shadow-lg rounded-xl">
                  <CardContent className="p-3 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-headline text-sm font-semibold leading-tight text-foreground truncate">
                        {subject.subjectName}
                      </p>
                      <p className="text-xs font-medium text-accent pt-0.5">
                        বিষয় কোড: {subject.subjectCode}
                      </p>
                    </div>
                    <div className="p-1.5 bg-accent/10 dark:bg-accent/20 rounded-full">
                      <ChevronRight className="h-4 w-4 text-accent" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                "{searchTerm}" এর জন্য কোনো বিষয় পাওয়া যায়নি।
              </p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="px-4 pb-4 pt-0 shrink-0">
        <a
          href="https://github.com/mythbrix"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-2 text-center text-xs font-semibold tracking-widest uppercase text-muted-foreground/80 bg-card/30 dark:bg-card/20 backdrop-blur-xl border border-white/10 rounded-xl py-3 shadow-inner hover:border-white/20 hover:text-muted-foreground transition-colors"
        >
          <span>DEVELOPED BY MYTHBRIX</span>
        </a>
      </footer>
    </div>
  );
}
