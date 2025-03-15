import React from 'react';

import { ingredientsService } from '@/services';

export const getIngredients = React.cache(async () => (await ingredientsService.getIngredients()).data);

export const getAmountTypes = React.cache(async () => (await ingredientsService.getAmountTypes()).data);
