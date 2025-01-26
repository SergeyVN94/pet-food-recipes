import { create, enforce, test } from 'vest';

import { FormFields } from './RecipeForm.types';

export const validationSuite = create((data: FormFields) => {
  test('title', 'Заполните поле', () => {
    enforce(data?.title).isNotEmpty();
  });

  test('title', 'Максимум 150 символов', () => {
    enforce(data?.title?.length ?? 0).lessThanOrEquals(150);
  });

  test('title', 'Недопустимые символы. Используйте только буквы, цифры и восклицательные знаки', () => {
    enforce(/^[a-zA-Zа-яА-Я0-9!\ ]+$/.test(data?.title ?? '')).equals(true);
  });

  test('description', 'Заполните поле', () => {
    enforce(data?.description?.trim()).isNotEmpty();
  });

  test('description', 'Максимум 150 символов', () => {
    enforce(data?.description?.length ?? 0).lessThanOrEquals(500);
  });

  data?.ingredients?.forEach((ingredient, index) => {
    test(`ingredients.${index}.count`, 'Заполните поле', () => {
      enforce(ingredient.count).isNotEmpty();
    });

    test(`ingredients.${index}.count`, 'Значение должно быть больше 0', () => {
      enforce(ingredient.count).greaterThan(0);
    });

    test(`ingredients.${index}.ingredientId`, 'Заполните поле', () => {
      enforce(ingredient.ingredientId).isNotEmpty();
    });

    test(`ingredients.${index}.amountTypeId`, 'Заполните поле', () => {
      enforce(ingredient.amountTypeId).isNotEmpty();
    });
  });

  data?.steps?.forEach((step, index) => {
    test(`steps.${index}.content`, 'Заполните поле', () => {
      enforce(step.content).isNotEmpty();
    });

    test(`steps.${index}.content`, 'Максимум 3000 символов', () => {
      enforce(step.content.length).lessThanOrEquals(3000);
    });
  });
});
