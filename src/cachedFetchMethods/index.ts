import React from 'react';

import { IngredientsService } from '@/services';

export const getIngredients = React.cache(async () => (await IngredientsService.getIngredients()).data);

export const getAmountTypes = React.cache(async () => (await IngredientsService.getAmountTypes()).data);
