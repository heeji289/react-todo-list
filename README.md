## TODO 앱 요구사항

- [x] 아이템 추가 기능
  - [ ] input validation 필요
- [x] 아이템 삭제 기능
  - [ ] 삭제 액션 warning 필요
- [x] 아이템 완료 기능
- [x] 완료 / 미완료 필터링 기능
- [ ] 다크모드
- [x] local storage에 상태 저장

<br />

## 스크린샷
### 아이템 추가 기능
![투두1](https://user-images.githubusercontent.com/41099712/208718501-34eea567-bd2f-4dcd-b093-311b44506040.gif)

### 전체, 완료, 미완료 필터링 기능
![투두2](https://user-images.githubusercontent.com/41099712/208718534-22935762-be56-470b-8f27-1e7af94f8609.gif)

### 아이템 완료 기능
![투두3](https://user-images.githubusercontent.com/41099712/208718575-ea282ccc-c6c0-4b00-8798-a2ad01664313.gif)

### 로컬 스토리지에 데이터 저장
![투두4](https://user-images.githubusercontent.com/41099712/208718614-32e67ea8-de88-41af-8b78-573d4e9e1623.gif)

## 기타 메모
### 참고링크

- [다크모드](https://levelup.gitconnected.com/dark-mode-in-react-533faaee3c6e)
- [local storage](https://stackoverflow.com/questions/72222728/why-is-localstorage-getting-cleared-whenever-i-refresh-the-page)
  - 문제: useEffect로 mount될 때 로컬 스토리지로부터 데이터를 불러오도록 구현했으나 새로고침시 로컬 스토리지가 빈 배열로 클리어되는 현상이 발생함 
  - 원인: useState와 useEffect가 비동기로 수행되어서 useState로 인해 list가 빈 배열로 세팅되어버림
  - 해결: useState의 initialState를 로컬 스토리지 값으로 설정하는 것

### 개선할 점

- 아이템 필터링 상태관리 덜 복잡하게
- 지저분한 인라인 스타일링
