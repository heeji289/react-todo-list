import { useState } from 'react';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
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

  return (
    <div style={{ border: '1px solid red' }}>
      {itemList.map(v => {
        return (
          <p
            key={v.itemID}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            {v.isCompleted ? <BiCheckboxChecked /> : <BiCheckbox />}
            {v.description}
          </p>
        );
      })}

      <input type="text" value={inputText} onChange={onChangeText} />
      <button onClick={onClickAdd}>➕ 추가하기</button>
    </div>
  );
}
