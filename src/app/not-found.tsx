import { IconArrowBack } from '@/assets/icons';
import { ButtonLink } from '@/components/ui';

export const metadata = {
  title: '404 - Страница не найдена',
  description: 'Страница не найдена',
};

const Page404 = () => (
  <div className="flex flex-col items-center w-full pt-4 gap-3">
    <h1 className="headline-l">404 - Страница не найдена</h1>
    <ButtonLink href="/" variant="text" iconLeft={<IconArrowBack className="size-6" />}>
      На главную
    </ButtonLink>
  </div>
);

export default Page404;
