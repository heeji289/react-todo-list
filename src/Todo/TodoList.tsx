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

  const onClickAdd = (e: React.MouseEvent<HTMLElement>) => {
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

  return (
    <div className={styles.itemList}>
      {itemList.map(v => {
        return (
          <div key={v.itemID} className={styles.item}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p onClick={() => onToggleCheck(v.itemID)}>
                {v.isCompleted ? (
                  <BiCheckboxChecked size={30} />
                ) : (
                  <BiCheckbox size={30} />
                )}
              </p>
              <p
                className={styles.itemDesciption}
                style={{
                  textDecoration: v.isCompleted ? 'line-through' : 'none',
                }}>
                {v.description}
              </p>
            </div>
            <BiTrash onClick={() => onClickDelete(v.itemID)} size={30} />
          </div>
        );
      })}

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
