import { create, enforce, test } from 'vest';

import { FormFields } from './RecipeForm.types';

export const validationSuite = create((data: Partial<FormFields> = {}) => {
  test('title', 'Заполните поле', () => {
    enforce(data.title).isNotEmpty();
  });

  test('title', 'Максимум 150 символов', () => {
    enforce(data.title).lessThanOrEquals(150);
  });

  test('description', 'Заполните поле', () => {
    enforce(data.description).isNotEmpty();
  });

  test('description', 'Максимум 150 символов', () => {
    enforce(data.description).lessThanOrEquals(500);
  });

  data.ingredients?.forEach((ingredient, index) => {
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

  data.steps?.forEach((step, index) => {
    test(`steps.${index}.content`, 'Заполните поле', () => {
      enforce(step.content).isNotEmpty();
    });
  });
});
