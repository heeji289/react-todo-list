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

export function TodoList() {
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

  const renderItemList = useMemo(() => {
    return itemList.map(v => {
      return (
        <TodoItem
          key={v.itemID}
          item={v}
          onClickDelete={onClickDelete}
          onToggleCheck={onToggleCheck}
        />
      );
    });
  }, [itemList]);

  return (
    <div className={styles.itemList}>
      {renderItemList}

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
