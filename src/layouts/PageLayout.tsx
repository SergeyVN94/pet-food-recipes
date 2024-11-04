import { Header } from '@/components';
import { cn } from '@/lib';

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const PageLayout = ({ className, children }: PageLayoutProps) => (
  <>
    <Header />
    <main>
      <div className={cn('container py-12 pb-16', className)}>{children}</div>
    </main>
  </>
);

export default PageLayout;
