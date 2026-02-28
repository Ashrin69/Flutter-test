'use client';

import React, { useState, useMemo, useEffect } from 'react';
import type { PhilosophySubject, Suggestion } from '@/lib/database';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';

const AnswerRenderer = ({ text }: { text: string }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-semibold text-foreground/90">{part.slice(2, -2)}</strong>;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

const SuggestionList = ({ suggestions, searchTerm }: { suggestions: Suggestion[], searchTerm: string }) => {
    const filteredSuggestions = useMemo(() => {
        if (!suggestions) return [];
        if (!searchTerm) return suggestions;
        return suggestions.filter(
            (item) =>
              item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.answer && item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
          );
    }, [suggestions, searchTerm]);

    if (!suggestions || suggestions.length === 0) {
        return (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                এই বিভাগে কোনো প্রশ্ন এখনো যোগ করা হয়নি।
              </p>
            </div>
        );
    }
    
    if (filteredSuggestions.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            {searchTerm
              ? `"${searchTerm}" এর জন্য কোনো প্রশ্ন পাওয়া যায়নি।`
              : "এই বিভাগে কোনো প্রশ্ন এখনো যোগ করা হয়নি।"
            }
          </p>
        </div>
      );
    }

    return (
      <Accordion type="single" collapsible className="w-full space-y-3">
        {filteredSuggestions.map((item, index) => (
          <AccordionItem key={item.id} value={item.id} className="bg-card/20 dark:bg-card/10 backdrop-blur-2xl border border-white/10 rounded-xl shadow-lg overflow-hidden">
            <AccordionTrigger className="p-4 text-left hover:no-underline group">
              <div className="flex items-start gap-4 flex-1">
                <span className="flex-shrink-0 mt-1 h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {index + 1}
                </span>
                <div className="flex-1 text-base font-medium leading-relaxed text-foreground/90">{item.question}</div>
              </div>
              <ChevronDown className="h-5 w-5 text-accent transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-0">
              <div className="pl-10 text-justify border-l-2 border-primary/20 ml-3" style={{ whiteSpace: 'pre-wrap' }}>
                {item.answer ? (
                  <div
                    className="max-w-none text-muted-foreground leading-loose"
                  >
                    <AnswerRenderer text={item.answer} />
                  </div>
                ) : (
                  <div className="border-l-2 border-dashed border-accent/50 pl-4 py-2">
                      <p className="text-muted-foreground italic text-sm">উত্তর শীঘ্রই যোগ করা হবে।</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
};

const SuggestionsSkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="p-4 border rounded-xl bg-card/20">
          <div className="flex items-start gap-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );


export default function SubjectPageClient({ subject }: { subject: PhilosophySubject }) {
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('part-a');

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const suggestionsForTab = useMemo(() => {
    switch (activeTab) {
      case 'part-a':
        return subject.partA;
      case 'part-b':
        return subject.partB;
      case 'part-c':
        return subject.partC;
      default:
        return [];
    }
  }, [activeTab, subject]);

  return (
    <div className="flex flex-col flex-grow">
      <header className="sticky top-0 z-10 bg-card/20 dark:bg-card/10 backdrop-blur-2xl border-b border-white/10 dark:border-white/5">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center justify-between">
              <Button asChild variant="ghost" size="icon" className="bg-white/10 dark:bg-white/5 rounded-full">
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <div className="flex-1 text-center min-w-0 px-2">
                <h1 className="text-lg font-bold font-headline text-foreground truncate" title={subject.subjectName}>
                  {subject.subjectName}
                </h1>
                <p className="text-sm font-medium text-accent">{subject.subjectCode}</p>
              </div>
              <div className="w-10" />
            </div>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="প্রশ্ন বা উত্তর খুঁজুন..."
                className="pl-11 w-full bg-transparent border-white/20 dark:border-white/10 placeholder:text-muted-foreground/80 rounded-full h-11"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 dark:bg-white/5 backdrop-blur-2xl rounded-md p-1 border border-white/10">
            <TabsTrigger value="part-a">ক বিভাগ</TabsTrigger>
            <TabsTrigger value="part-b">খ বিভাগ</TabsTrigger>
            <TabsTrigger value="part-c">গ বিভাগ</TabsTrigger>
          </TabsList>
          {isClient ? (
            <TabsContent value={activeTab} className="mt-6">
                <SuggestionList suggestions={suggestionsForTab} searchTerm={searchTerm} />
            </TabsContent>
          ) : (
            <TabsContent value={activeTab} className="mt-6">
                <SuggestionsSkeleton />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
