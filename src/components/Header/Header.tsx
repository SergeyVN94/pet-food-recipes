import Link from 'next/link';

import { IconAdd } from '@/assets/icons';

import { ButtonLink } from '../ui';

const Header = () => (
  <header className="bg-surf-cont-high border-b border-primary/[0.12]">
    <div className="container py-4 flex flex-nowrap items-center">
      <Link href="/">
        <h1 className="headline-m">Рецепты</h1>
      </Link>
      <div className="flex flex-nowrap gap-2 ml-auto">
        <ButtonLink href="/recipe/new" variant="filled" iconLeft={<IconAdd width={18} height={18} />}>
          Добавить рецепт
        </ButtonLink>
      </div>
    </div>
  </header>
);

export default Header;
