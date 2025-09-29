import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useMemo,
  useCallback,
  useLayoutEffect,
  useContext,
  useId,
  createContext,
} from "react";

// ==== useState: простое состояние ====
const Counter = () => {
  const [count, setCount] = useState(0); // состояние со счётчиком
  return (
    <div>
      <h3>Счётчик (useState):</h3>
      <p>Текущее значение: {count}</p>
      <button onClick={() => setCount(count + 1)}>➕ Увеличить</button>
      <button onClick={() => setCount(count - 1)}>➖ Уменьшить</button>
    </div>
  );
};

// ==== useEffect: работа с побочными эффектами ====
const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Запускаем интервал
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);

    // Возвращаем очистку (аналог componentWillUnmount)
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h3>Таймер (useEffect):</h3>
      <p>⏱ Прошло {seconds} секунд</p>
    </div>
  );
};

// ==== useReducer: управление списком задач ====
const taskReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), title: action.title, done: false }];
    case "toggle":
      return state.map((t) =>
        t.id === action.id ? { ...t, done: !t.done } : t
      );
    case "remove":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
};

const TaskManager = () => {
  const [tasks, dispatch] = useReducer(taskReducer, [
    { id: 1, title: "Изучить хуки", done: true },
    { id: 2, title: "Сделать проект", done: false },
  ]);
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch({ type: "add", title: input });
    setInput("");
  };

  return (
    <div>
      <h3>Задачи (useReducer):</h3>
      <form onSubmit={handleAdd}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Новая задача..."
        />
        <button type="submit">Добавить</button>
      </form>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => dispatch({ type: "toggle", id: t.id })}
              style={{
                cursor: "pointer",
                textDecoration: t.done ? "line-through" : "none",
                color: t.done ? "green" : "black",
              }}
            >
              {t.done ? "✅" : "⬜"} {t.title}
            </span>
            <button onClick={() => dispatch({ type: "remove", id: t.id })}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ==== useRef: доступ к DOM ====
const FocusInput = () => {
  const inputRef = useRef(null); // ссылка на DOM-элемент

  const handleFocus = () => inputRef.current.focus();

  return (
    <div>
      <h3>useRef пример:</h3>
      <input ref={inputRef} type="text" placeholder="Фокус сюда" />
      <button onClick={handleFocus}>Фокус на input</button>
    </div>
  );
};

// ==== useMemo: оптимизация вычислений ====
const ExpensiveCalculation = ({ number }) => {
  const calc = useMemo(() => {
    console.log("Тяжёлый расчёт...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) result += i;
    return result + number;
  }, [number]);

  return <p>🔢 Результат вычислений: {calc}</p>;
};

const MemoExample = () => {
  const [num, setNum] = useState(1);
  return (
    <div>
      <h3>useMemo пример:</h3>
      <button onClick={() => setNum((n) => n + 1)}>➕ Увеличить число</button>
      <ExpensiveCalculation number={num} />
    </div>
  );
};

// ==== useCallback: мемоизация функции ====
const Child = React.memo(({ onClick }) => {
  console.log("Рендер дочернего компонента");
  return <button onClick={onClick}>👶 Нажми ребёнка</button>;
});

const CallbackExample = () => {
  const [count, setCount] = useState(0);

  // useCallback мемоизирует функцию и предотвращает лишние рендеры Child
  const handleClick = useCallback(() => {
    alert("Кнопка из дочернего компонента");
  }, []);

  return (
    <div>
      <h3>useCallback пример:</h3>
      <p>Счётчик: {count}</p>
      <button onClick={() => setCount(count + 1)}>➕</button>
      <Child onClick={handleClick} />
    </div>
  );
};

// ==== useLayoutEffect: работа с размерами до отрисовки ====
const LayoutExample = () => {
  const boxRef = useRef();

  useLayoutEffect(() => {
    if (boxRef.current) {
      console.log("Ширина блока:", boxRef.current.offsetWidth);
    }
  }, []);

  return (
    <div>
      <h3>useLayoutEffect пример:</h3>
      <div
        ref={boxRef}
        style={{ width: "200px", height: "50px", background: "lightblue" }}
      >
        Блок
      </div>
    </div>
  );
};

// ==== useContext: глобальное состояние ====
const ThemeContext = createContext("light");

const ThemedBox = () => {
  const theme = useContext(ThemeContext); // получаем значение темы
  return (
    <div
      style={{
        padding: "10px",
        margin: "5px 0",
        background: theme === "light" ? "#eee" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      Я {theme} блок
    </div>
  );
};

const ContextExample = () => {
  return (
    <ThemeContext.Provider value="dark">
      <h3>useContext пример:</h3>
      <ThemedBox />
    </ThemeContext.Provider>
  );
};

// ==== useId: уникальные id ====
const IdExample = () => {
  const id = useId();
  return (
    <div>
      <h3>useId пример:</h3>
      <label htmlFor={id}>Введите имя:</label>
      <input id={id} type="text" />
    </div>
  );
};

// ==== Кастомный хук (пример: работа с localStorage) ====
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const CustomHookExample = () => {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div>
      <h3>Кастомный хук (localStorage):</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введите имя..."
      />
      <p>Ваше имя: {name}</p>
    </div>
  );
};

// ==== Главный компонент со всеми хуками ====
const HooksDemo = () => {
  return (
    <div className="page">
      <Counter />
      <Timer />
      <TaskManager />
      <FocusInput />
      <MemoExample />
      <CallbackExample />
      <LayoutExample />
      <ContextExample />
      <IdExample />
      <CustomHookExample />
    </div>
  );
};

export default HooksDemo;

