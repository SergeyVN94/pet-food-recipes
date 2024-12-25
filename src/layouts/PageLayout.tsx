import { Header } from '@/components';
import { cn } from '@/utils';

type PageLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const PageLayout = ({ className, children }: PageLayoutProps) => (
  <>
    <Header />
    <main className={cn('container py-12 pb-16', className)}>{children}</main>
  </>
);

export default PageLayout;
