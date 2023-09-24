import { Button } from '@/components/ui';
import { IconAdd } from '@/assets/icons';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant='filled' iconLeft={<IconAdd width={18} height={18} />}>Button</Button>
    </main>
  );
}
