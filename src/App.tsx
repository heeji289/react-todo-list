import { DarkmodeProvider } from 'Todo/DarkmodeContext';
import { TodoList } from 'Todo/TodoList';
import styles from './App.module.css';

function App() {
  return (
    <DarkmodeProvider>
      <div className={styles.App}>
        <h2>TODO LIST 🔖</h2>
        <TodoList />
      </div>
    </DarkmodeProvider>
  );
}

export default App;
