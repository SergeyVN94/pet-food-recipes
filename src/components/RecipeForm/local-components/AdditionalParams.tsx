import { InputUncontrolled } from '@/ui';

const AdditionalParams = () => (
  <fieldset className="mt-8">
    <legend className="title-l">Параметры блюда</legend>
    <InputUncontrolled name="servingsNumber" label="Количество порций" className="mt-4" type="number" />
    <InputUncontrolled name="calories" label="Килокалории" className="mt-4" type="number" />
  </fieldset>
);

export default AdditionalParams;
