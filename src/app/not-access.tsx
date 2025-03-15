import { IconArrowBack } from '@/assets/icons';
import { ButtonLink } from '@/components/ui';

const NotAccessPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="headline-l">403 - Доступ запрещен</h1>
      <ButtonLink href="/" variant="text" iconLeft={<IconArrowBack className="size-6" />}>
        На главную
      </ButtonLink>
    </div>
  );
};

export default NotAccessPage;
