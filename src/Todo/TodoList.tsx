import { useState } from 'react';
import { BiCheckbox, BiCheckboxChecked, BiTrash } from 'react-icons/bi';
import uuid from 'react-uuid';

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
    <div style={{ border: '1px solid red' }}>
      {itemList.map(v => {
        return (
          <div
            key={v.itemID}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <p onClick={() => onToggleCheck(v.itemID)}>
              {v.isCompleted ? <BiCheckboxChecked /> : <BiCheckbox />}
            </p>
            <p
              style={{
                textDecoration: v.isCompleted ? 'line-through' : 'none',
              }}>
              {v.description}
            </p>
            <BiTrash onClick={() => onClickDelete(v.itemID)} />
          </div>
        );
      })}

      <input type="text" value={inputText} onChange={onChangeText} />
      <button onClick={onClickAdd}>➕ 추가하기</button>
    </div>
  );
}
