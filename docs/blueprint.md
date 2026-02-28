# **App Name**: PhiloExamPrep

## Core Features:

- Subject Dashboard: Display a list of 9 Philosophy subjects with their codes and names.
- Subject Search: Implement a sticky search bar for quickly filtering subjects.
- Content Reader: Display content divided into Part A, Part B, and Part C tabs.
- Offline Capability: Enable full offline access to cached subject data using a Service Worker with a cache-first strategy.
- Silent Background Sync: Silently fetch and update data in the background when online without blocking the UI.

## Style Guidelines:

- Primary color: Dark navy blue (#243c5a) for a professional and academic feel.
- Background color: Light grey (#f0f0f5) for a clean, readable interface.
- Accent color: Muted gold (#a9927d) to highlight key elements and sections.
- Body font: 'Inter', a grotesque-style sans-serif font, will be used for its modern, machined look and readability.
- Headline font: 'Space Grotesk', a sans-serif font, will be used to bring in a modern high-tech, sciency look that feels suitable for a modern app and to make the important subjects stand out.  Since longer text is anticipated, this will be for headlines with Inter used for body text
- Use inline SVGs from 'lucide-react' for all icons, ensuring zero asset friction and perfect scalability.
- Employ a 2-screen flow with a sticky search bar on the subject dashboard and a sticky header on the content view.
- Implement butter-smooth slide-in transitions between Screen 1 and Screen 2 to improve user experience.