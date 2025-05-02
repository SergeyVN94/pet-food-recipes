import { Suspense } from 'react';

import Link from 'next/link';

import { IconAdd } from '@/assets/icons';
import { ButtonLink } from '@/ui';

import { AuthSection } from './components';

const Header = () => (
  <header className="border-b border-primary/[0.12] bg-surf-cont-highest">
    <div className="container flex flex-nowrap items-center py-4">
      <Link href="/" className="headline-m">
        Рецепты
      </Link>
      <div className="ml-auto flex flex-nowrap items-center gap-2">
        <Suspense fallback={<div className="skeleton h-[2.5rem] w-[2.5rem] cursor-progress rounded-full" />}>
          <AuthSection />
        </Suspense>
        <ButtonLink href="/recipe/new" variant="filled" iconLeft={<IconAdd width={18} height={18} />}>
          Добавить рецепт
        </ButtonLink>
      </div>
    </div>
  </header>
);

export default Header;
