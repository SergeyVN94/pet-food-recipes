import React from 'react';

import { IngredientService } from '@/services';

export const getIngredients = React.cache(async () => (await IngredientService.getIngredients()).data);

export const getAmountTypes = React.cache(async () => (await IngredientService.getAmountTypes()).data);
