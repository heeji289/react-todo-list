import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { BiCheckbox, BiCheckboxChecked, BiTrash } from 'react-icons/bi';
import uuid from 'react-uuid';
import styles from './TodoList.module.css';

type ItemType = {
  itemID: string;
  description: string;
  isCompleted: boolean;
};

const FILTER_LIST = ['all', 'completed', 'progress'] as const;
type FilterListType = typeof FILTER_LIST[number];

export function TodoList() {
  const [itemFilter, setItemFilter] = useState<FilterListType>('all');
  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [inputText, setInputText] = useState('');

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onClickAdd = () => {
    setItemList(prev =>
      prev.concat({
        itemID: uuid(),
        description: inputText,
        isCompleted: false,
      })
    );

    setInputText('');
  };

  const onClickDelete = (itemID: string) => {
    setItemList(prev => prev.filter(v => v.itemID !== itemID));
  };

  const onToggleCheck = (itemID: string) => {
    setItemList(prev =>
      prev.map(v => {
        if (v.itemID === itemID) {
          return {
            ...v,
            isCompleted: !v.isCompleted,
          };
        } else {
          return v;
        }
      })
    );
  };

  const onApplyFilter = (status: FilterListType) => {
    setItemFilter(status);
  };

  const filteredItemList = useMemo(() => {
    return itemList.filter(item => {
      if (itemFilter === 'all') {
        return true;
      } else if (itemFilter === 'completed') {
        return item.isCompleted;
      } else if (itemFilter === 'progress') {
        return !item.isCompleted;
      } else {
        return false;
      }
    });
  }, [itemList, itemFilter]);

  return (
    <div className={styles.itemList}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <button
          className={styles.addButton}
          onClick={() => onApplyFilter('all')}>
          전체
        </button>
        <button
          className={styles.addButton}
          onClick={() => onApplyFilter('completed')}>
          완료
        </button>
        <button
          className={styles.addButton}
          onClick={() => onApplyFilter('progress')}>
          미완료
        </button>
      </div>

      <TodoListComponent
        list={filteredItemList}
        onClickDelete={onClickDelete}
        onToggleCheck={onToggleCheck}
      />

      <div className={styles.textInputContainer}>
        <input
          className={styles.textInput}
          type="text"
          value={inputText}
          onChange={onChangeText}
          placeholder="추가할 아이템을 적어보세요!"
        />
        <button className={styles.addButton} onClick={onClickAdd}>
          추가하기
        </button>
      </div>
    </div>
  );
}

const TodoListComponent = React.memo(
  ({
    list,
    onClickDelete,
    onToggleCheck,
  }: {
    list: ItemType[];
    onClickDelete: (itemID: string) => void;
    onToggleCheck: (itemID: string) => void;
  }) => {
    return (
      <>
        {list.map(v => (
          <TodoItem
            key={v.itemID}
            item={v}
            onClickDelete={onClickDelete}
            onToggleCheck={onToggleCheck}
          />
        ))}
      </>
    );
  }
);

function TodoItem({
  item,
  onToggleCheck,
  onClickDelete,
}: {
  item: ItemType;
  onToggleCheck: (itemID: string) => void;
  onClickDelete: (itemID: string) => void;
}) {
  return (
    <div className={styles.item}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p onClick={() => onToggleCheck(item.itemID)}>
          {item.isCompleted ? (
            <BiCheckboxChecked size={30} />
          ) : (
            <BiCheckbox size={30} />
          )}
        </p>
        <p
          className={styles.itemDesciption}
          style={{
            textDecoration: item.isCompleted ? 'line-through' : 'none',
          }}>
          {item.description}
        </p>
      </div>
      <BiTrash onClick={() => onClickDelete(item.itemID)} size={30} />
    </div>
  );
}
