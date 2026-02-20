import { Button } from '@/components/ui/button';

export default function HomePage(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="text-4xl font-bold">AceAgency</h1>
      <Button>Get Started</Button>
    </main>
  );
}
