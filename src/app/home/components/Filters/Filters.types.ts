export type FormFields = {
  isDeleted: boolean;
  isPublished: boolean;
  includesIngredients: Record<number, boolean>;
  excludesIngredients: Record<number, boolean>;
};
