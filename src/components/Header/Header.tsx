import { Suspense } from 'react';

import Link from 'next/link';

import { IconAdd } from '@/assets/icons';
import { ButtonLink } from '@/ui';

import { AuthSection } from './components';

const Header = () => (
  <header className="bg-surf-cont-high border-b border-primary/[0.12]">
    <div className="container py-4 flex flex-nowrap items-center">
      <Link href="/" className="headline-m">
        Рецепты
      </Link>
      <div className="flex flex-nowrap gap-2 ml-auto items-center">
        <Suspense fallback={<div className="skeleton w-[2.5rem] h-[2.5rem] cursor-progress rounded-full" />}>
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
