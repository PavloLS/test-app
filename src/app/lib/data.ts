export interface Category {
  id: number;
  name: string;
  enabled: boolean;
  sort: number;
}

let categories: Category[] = [
  {id: 1, name: 'Other', enabled: true, sort: 0},
];

const sortedCategories = (a, b) => b.sort - a.sort;

export const getCategories = () => categories.sort(sortedCategories);

export const addCategory = (category: Category) => {
  categories = [...categories, category];
  return categories.sort(sortedCategories);
};

export const editCategory = (updatedCategories: Category[]) => {
  categories = categories.map(category => {
    const isCategory = updatedCategories.find(x => x.id === category.id);
    return isCategory  ? isCategory : category;
  });
  return categories.sort(sortedCategories);
};

export const deleteCategory = (id: number) => {
  categories = categories.filter(category => category.id !== id);
  return categories.sort(sortedCategories);
};
