import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useMemo,
  useCallback,
} from "react";

/* ==========================
   useState: переключатель темы
   ========================== */
const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  return (
    <div
      style={{
        background: dark ? "#222" : "#eee",
        color: dark ? "#fff" : "#000",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
      }}
    >
      <h3>useState (переключатель темы):</h3>
      <button onClick={() => setDark(!dark)}>
        {dark ? "🌙 Тёмная" : "☀️ Светлая"}
      </button>
    </div>
  );
};

/* ==========================
   useEffect: работа с API + try/catch
   ========================== */
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=3"
        );
        if (!res.ok) {
          throw new Error(`Ошибка: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>useEffect (загрузка с try/catch):</h3>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
};

/* =====================================
   useReducer: счётчик с шагом
   ===================================== */
const counterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + action.step;
    case "decrement":
      return state - action.step;
    case "reset":
      return 0;
    default:
      return state;
  }
};

const StepCounter = () => {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>useReducer (счётчик со step):</h3>
      <p>Счётчик: {count}</p>
      <button onClick={() => dispatch({ type: "increment", step: 5 })}>
        ➕ +5
      </button>
      <button onClick={() => dispatch({ type: "decrement", step: 2 })}>
        ➖ -2
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>🔄 Сброс</button>
    </div>
  );
};

/* ===============================
   useRef: сохранение предыдущего значения
   =============================== */
const PreviousValue = () => {
  const [value, setValue] = useState("");
  const prevValue = useRef("");

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>useRef (предыдущее значение):</h3>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите текст..."
      />
      <p>Текущее: {value}</p>
      <p>Предыдущее: {prevValue.current}</p>
    </div>
  );
};

/* =======================================
   useMemo: фильтрация списка
   ======================================= */
const FilteredList = () => {
  const [query, setQuery] = useState("");

  const items = useMemo(() => ["React", "Redux", "Axios", "AWS"], []);

  const filtered = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>useMemo (фильтр списка):</h3>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
      />
      <ul>
        {filtered.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
};

/* =================================
   useCallback: список с добавлением
   ================================= */
const TodoChild = React.memo(({ todo, onRemove }) => {
  console.log("🔄 Рендер TodoChild:", todo);
  return (
    <li>
      {todo} <button onClick={onRemove}>❌</button>
    </li>
  );
});

const TodoList = () => {
  const [todos, setTodos] = useState(["Изучить React"]);

  const addTodo = () => setTodos([...todos, "Новое дело " + Date.now()]);

  const removeTodo = useCallback(
    (todo) => setTodos((prev) => prev.filter((t) => t !== todo)),
    []
  );

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>useCallback (список задач):</h3>
      <button onClick={addTodo}>➕ Добавить</button>
      <ul>
        {todos.map((t) => (
          <TodoChild key={t} todo={t} onRemove={() => removeTodo(t)} />
        ))}
      </ul>
    </div>
  );
};

/* ==========================
   Главный компонент HookDemo
   ========================== */
const HookDemo = () => {
  return (
    <div className="page" style={{ padding: "1rem" }}>
      <ThemeToggle />
      <Posts />
      <StepCounter />
      <PreviousValue />
      <FilteredList />
      <TodoList />
    </div>
  );
};

export default HookDemo;

