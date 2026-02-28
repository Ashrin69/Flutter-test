import { philosophySubjects } from '@/lib/database';
import { notFound } from 'next/navigation';
import SubjectPageClient from '@/components/SubjectPageClient';

export default function SubjectPage({ params }: { params: { code: string } }) {
  const code = params.code;
  const subject = philosophySubjects.find((s) => s.subjectCode === code);

  if (!subject) {
    notFound();
  }

  return <SubjectPageClient subject={subject} />;
}
