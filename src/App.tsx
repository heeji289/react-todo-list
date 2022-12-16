import { TodoList } from 'Todo/TodoList';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <h2>TODO LIST 🔖</h2>
      <TodoList />
    </div>
  );
}

export default App;
