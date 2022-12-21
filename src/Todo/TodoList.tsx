import React, { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { BiCheckbox, BiCheckboxChecked, BiTrash } from 'react-icons/bi';
import uuid from 'react-uuid';
import { useDarkMode } from './DarkmodeContext';
import styles from './TodoList.module.css';

type ItemType = {
  itemID: string;
  description: string;
  isCompleted: boolean;
};

const FILTER_LIST = ['all', 'completed', 'progress'] as const;
type FilterListType = typeof FILTER_LIST[number];

export function TodoList() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const [itemFilter, setItemFilter] = useState<FilterListType>('all');
  const [itemList, setItemList] = useState(() => {
    const localData = localStorage.getItem('todos');

    if (localData) {
      return JSON.parse(localData) as ItemType[];
    } else {
      return [];
    }
  });

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

  const onAddTodoCallback = (inputText: string) => {
    setItemList(prev =>
      prev.concat({
        itemID: uuid(),
        description: inputText,
        isCompleted: false,
      })
    );
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

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(itemList));
  }, [itemList]);

  return (
    <div className={styles.itemList}>
      <button onClick={toggleDarkMode}>
        {darkMode ? '다크모드 끄기' : '다크모드 켜기'}
      </button>

      <ItemFilter
        itemFilter={itemFilter}
        onApplyFilterCallback={onApplyFilter}
      />

      <TodoListComponent
        list={filteredItemList}
        onClickDelete={onClickDelete}
        onToggleCheck={onToggleCheck}
      />

      <AddTodoForm onClickAddCallback={onAddTodoCallback} />
    </div>
  );
}

function ItemFilter({
  itemFilter,
  onApplyFilterCallback,
}: {
  itemFilter: FilterListType;
  onApplyFilterCallback: (status: FilterListType) => void;
}) {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '6px',
      }}>
      {FILTER_LIST.map(v => (
        <button
          key={v}
          className={`${styles.filterChip} ${
            itemFilter === v && styles.selected
          }`}
          onClick={() => onApplyFilterCallback(v)}
          style={{ marginRight: '4px' }}>
          {v}
        </button>
      ))}
    </header>
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
      <section>
        <ul>
          {list.map(v => (
            <TodoItem
              key={v.itemID}
              item={v}
              onClickDelete={onClickDelete}
              onToggleCheck={onToggleCheck}
            />
          ))}
        </ul>
      </section>
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
    <li className={styles.item}>
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
    </li>
  );
}

function AddTodoForm({
  onClickAddCallback,
}: {
  onClickAddCallback: (text: string) => void;
}) {
  const [inputText, setInputText] = useState('');

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onSubmitTodoItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputText.trim().length === 0) {
      alert('할 일을 입력해주세요');
      return;
    }

    onClickAddCallback(inputText);
    setInputText('');
  };

  return (
    <form className={styles.textInputContainer} onSubmit={onSubmitTodoItem}>
      <input
        className={styles.textInput}
        type="text"
        value={inputText}
        onChange={onChangeText}
        placeholder="추가할 아이템을 적어보세요!"
      />
      <button className={styles.addButton}>추가하기</button>
    </form>
  );
}
