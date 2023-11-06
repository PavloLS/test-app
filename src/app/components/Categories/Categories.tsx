import React, {useCallback, useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import PlusIcon from "@/app/components/icons/PlusIcon";
import CategoryItem, {Switch} from "@/app/components/Categories/CategoryItem";
import * as yup from "yup";
import {FormikValues, useFormik} from 'formik';
import Actions from "@/app/components/Actions";
import update from "immutability-helper";
import {Context, ContextCategory, ContextValue} from "@/app/DashboardContext";
import Modal from "@/app/components/Modal";
import {Category} from "@/app/lib/data";

const ERROR_CATEGORY_MESSAGE = 'Category name is required!';

const validationSchema = yup.object().shape({
  name: yup.string().required(ERROR_CATEGORY_MESSAGE),
});

const initialValues: FormikValues = {
  name: '',
  enabled: false,
};

const fetchDeleteCategory = async (id: number): Promise<Category[]> => {
  const res = await fetch(`http://localhost:3000/api/category/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
  const data = await res.json();
  return data.items;
};

const fetchEditCategory = async (categories: Category[]): Promise<Category[]> => {
  const res = await fetch(`http://localhost:3000/api/category`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(categories)
  });
  const data = await res.json();
  return data.items;
};

const Categories = () => {
  const {categories, setCategories} = useContext<ContextValue>(Context);
  const [createCategory, setCreateCategory] = useState(false);
  const [displayModal, setDisplayModal] = useState<number | null>(null);

  const {
    errors,
    values,
    handleChange,
    handleBlur,
    resetForm,
    setValues,
    isValid,
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: () => {},
  });

  const onDelete = async (id: number | null) => {
    const items: Category[] = await fetchDeleteCategory(id as number);
    setCategories(items);
    setDisplayModal(null);
  };

  const getCategories = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/category')
      const data = await res.json();
      setCategories(data.items);
    } catch (err) {
      console.error(err)
    }

  }, [setCategories]);

  useEffect(() => {
    getCategories();
  },[getCategories]);

  const handleCancel = useCallback(() => {
    if (categories.some(x => x?.edit)) {
      const defaultCategoriesValues = categories.map(({edit, prevSort, prevEnabled, ...keepAttrs}) => ({...keepAttrs, sort: prevSort ?? keepAttrs.sort, enabled: prevEnabled ?? keepAttrs.enabled}))
      setCategories(defaultCategoriesValues.sort((a, b) => b.sort - a.sort));
    } else {
      resetForm();
      setCreateCategory(false);
    }
  }, [categories, resetForm, setCreateCategory, setCategories]);

  const handleSubmit = useCallback(async () => {
    if (categories.some(x => x?.edit)) {
      const items = await fetchEditCategory(categories.filter(x => !!x.edit).map(({edit, prevEnabled, prevSort, ...keepAttrs}) => keepAttrs));
      setCategories(items);
      return;
    }
    if (isValid && values.name) {
      const res = await fetch('http://localhost:3000/api/category', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...values, sort: categories.length})
      });
      const data = await res.json();
      setCategories(data.items);
      handleCancel();
    } else if (!values.name && !isValid) {
      setErrors({name: ERROR_CATEGORY_MESSAGE})
    }
  }, [isValid, values, categories, handleCancel, setCategories, setErrors]);

  const moveCategory = useCallback((dragIndex: number, hoverIndex: number) => {
    // @ts-ignore
    setCategories((prevCategories) =>
      update(prevCategories, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCategories[dragIndex]],
        ],
      }).map((x: ContextCategory, i: number, arr: ContextCategory[]) => ({...x, edit: true, sort: (arr.length - 1) - i, prevSort: x.prevSort ?? x.sort})),
    )
  }, [setCategories]);

  return (
    <CategoriesContainer>
      <CreateButton onClick={() => setCreateCategory(true)}>
        <PlusIcon />
        Create a Category
      </CreateButton>

      <CategoryList>
        {createCategory && (
          <>
            <Item>
              <input
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                placeholder="Enter Category Name"
              />
              <Switch onClick={() => setValues({...values, enabled: !values.enabled})}>
                <input
                  type="checkbox"
                  name="color_mode"
                  checked={values.enabled}
                  value="1"
                />
                <label data-on="On" data-off="Off" className="btn-color-mode-switch-inner" />
              </Switch>
            </Item>
            {(errors.name && typeof errors.name === 'string') && <Error>{errors.name}</Error>}
          </>
        )}
        {categories.map((category, index) => (
          <CategoryItem
            index={index}
            key={category.id}
            showDeleteModal={setDisplayModal}
            moveCategory={moveCategory}
            category={category}
          />
        ))}
      </CategoryList>
      {(createCategory || categories.some(x => !!x?.edit)) && <Actions handleSubmit={handleSubmit} cancel={handleCancel} />}
      <Modal
        displayModal={displayModal}
        closeModal={() => setDisplayModal(null)}
        onDelete={onDelete}
      />
    </CategoriesContainer>
  );
};

const CategoriesContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 638px;
  max-height: calc(100% - 230px);
  margin-top: 40px;
  padding: 0 30px;
  @media (max-width: 468px) {
    max-height: calc(100% - 365px);
  }
`;

const CategoryList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
  margin: '12px 0',
  overflow: 'auto',
  "&::-webkit-scrollbar": {
    width: 10,
  },
  "&::-webkit-scrollbar-track": {
    background: '#f1f1f1',
  },
  "&::-webkit-scrollbar-thumb": {
    background: '#888',
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: '#555',
  }
});

const Error = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: red;
`;

const CreateButton = styled.button`
  display: flex;
  width: 100%;
  height: 50px;
  padding: 14px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background: linear-gradient(0deg, #884DFE 0%, #884DFE 100%), linear-gradient(104deg, #A139FD 11.26%, #50BDFC 90.79%);
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.08);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  color: #FFF;
`;

export const Item = styled('div')<{active?: boolean}>((props) => ({
  borderRadius: '4px',
  border: '2px solid #323443',
  background: '#24252E',
  display: 'flex',
  width: '100%',
  padding: '12px 20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  svg: {
    cursor: 'pointer',
    '&:hover path': {
      fill: 'white'
    },
  },
  p: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '12px',
    color: props?.active ? '#fff' : '#696969',
  },
  div: {
    display: 'flex',
    alignItems: 'center',
    gap: 20
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '12px',
    "&:focus": {
      outline: 'none',
      border: 'none'
    },
    "::placeholder": {
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 500,
      color: '#696969'
    }
  },
}));

export default Categories;