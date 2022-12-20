## TODO 앱 요구사항

- [x] 아이템 추가 기능
  - [ ] input validation 필요
- [x] 아이템 삭제 기능
  - [ ] 삭제 액션 warning 필요
- [x] 아이템 완료 기능
- [x] 완료 / 미완료 필터링 기능
- [ ] 다크모드
- [x] local storage에 상태 저장

## 참고링크

- [다크모드](https://levelup.gitconnected.com/dark-mode-in-react-533faaee3c6e)
- [local storage](https://stackoverflow.com/questions/72222728/why-is-localstorage-getting-cleared-whenever-i-refresh-the-page)
  - useEffect로 mount될 때 로컬 스토리지로부터 데이터를 불러오도록 구현했으나 새로고침시 로컬 스토리지가 빈 배열로 클리어되는 현상이 발생함 - 원인은 useState와 useEffect가 비동기로 수행되어서 useState로 인해 list가 빈 배열로 세팅되어버림 - 해결은 useState의 initialState를 로컬 스토리지 값으로 설정하는 것

## 고치고 싶은 부분

- 아이템 필터링 상태관리
