'use client'
import React, {createContext, useState} from 'react';
import {Category} from "@/app/lib/data";

export type ContextCategory = Category & {edit?: boolean; prevEnabled?: boolean; prevSort?: number};

export interface ContextValue {
  categories: ContextCategory[];
  setCategories: (value: ContextCategory[]) => void;
  search: string;
  setSearch: (value: string) => void;
}

export const Context = createContext<ContextValue>({
  categories: [],
  setCategories: () => null,
  search: '',
  setSearch: () => null,

})

const DashboardContext: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [categories, setCategories] = useState<ContextCategory[]>([]);
  const [search, setSearch] = useState('');

  const filteredCategories = search ? categories.filter(category => category.name.toLowerCase().includes(search.toLowerCase())) : categories;

  return (
    <Context.Provider value={{ categories: filteredCategories, setCategories, setSearch, search }}>
      {children}
    </Context.Provider>
  );
};

export default DashboardContext;