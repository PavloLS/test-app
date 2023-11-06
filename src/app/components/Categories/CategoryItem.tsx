import React, {useContext} from 'react';
import DeleteIcon from "@/app/components/icons/DeleteIcon";
import DragAndDropIcon from "@/app/components/icons/DragAndDropIcon";
import {Category} from "@/app/lib/data";
import {Item} from "@/app/components/Categories/Categories";
import styled from "styled-components";
import { useDrag, useDrop } from 'react-dnd'
import {Context} from "@/app/DashboardContext";

interface CategoryItemProps {
  category: Category;
  index: number;
  moveCategory: (dragIndex: number, hoverIndex: number, dragId: number, hoverId: number) => void;
  showDeleteModal: (value: number | null) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({index, category, moveCategory, showDeleteModal}) => {
  const ref = React.useRef(null);
  const {categories, setCategories} = useContext(Context);

  const handleSwitch = async () => {
    setCategories(categories.map(x => x.id === category.id ? ({...x, enabled: !x.enabled, edit: true, prevEnabled: x.enabled}) : x));
  };

  const [{ handlerId }, drop] = useDrop({
    accept: "CARD",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const dragId = item.id
      const hoverIndex = index
      const hoverId = category.id
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      if (categories.findIndex(x => x.name === 'Other') === dragIndex || categories.findIndex(x => x.name === 'Other') === hoverIndex) {
        return
      }
      // Time to actually perform the action
      moveCategory(dragIndex, hoverIndex, dragId, hoverId)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: () => {
      return { id: category.id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <Item active={category.enabled} key={category.id} ref={ref}>
      <p>{category.name}</p>
      <div className="d-flex">
        <Switch onClick={handleSwitch}>
          <input
            type="checkbox"
            name="color_mode"
            checked={category.enabled}
            value="1"
          />
          <label data-on="On" data-off="Off" className="btn-color-mode-switch-inner" />
        </Switch>
        {category.name !== 'Other' && <DeleteIcon onClick={() => showDeleteModal(category.id)} />}
        <DragAndDropIcon />
      </div>
    </Item>
  );
};

export const Switch = styled('label')({
  fontSize: 13,
  color: '#424242',
  fontWeight: 500,
  display: 'inline-block',
  margin: '0px',
  position: 'relative',
  cursor: 'pointer',
  label: {
    margin: 0,
    width: 47,
    height: 26,
    background: '#272934',
    borderRadius: '99px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'all 0.3s ease',
    display: 'block',
    cursor: 'pointer',
    '&:before': {
      content: 'attr(data-off)',
      position: 'absolute',
      fontSize: 11,
      fontWeight: 700,
      top: 5,
      right: 8,
    },
    '&:after': {
      content: '""',
      width: 12,
      height: 12,
      background: '#9B9D9F',
      borderRadius: '26px',
      position: 'absolute',
      left: 7,
      top: 7,
      transition: 'all 0.3s ease',
    }
  },
  input: {
    cursor: 'pointer',
    width: 12,
    height: 12,
    opacity: 0,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    margin: '0px',
    '&:checked + label.btn-color-mode-switch-inner': {
      background: '#3E3F49',
      color: '#07D41B',
    },
    '&:checked + label.btn-color-mode-switch-inner:after': {
      content: '',
      left: 28,
      background: '#07D41B',
    },
    '&:checked + label.btn-color-mode-switch-inner:before': {
      content: 'attr(data-on)',
      right: 'auto',
      left: 8,
    },
  }
});

export default CategoryItem;