import React, { useState } from "react";

// ==== Данные ====
const userName = "Hello";
const userIcon = "🚀";
const isLoggedIn = true;
const fruits = ["🍎 Apple", "🍌 Banana", "🍇 Grapes"];
const user = { firstName: "Alex", lastName: "Dolinsky" };
const tasks = [
  { id: 1, title: "Learn React", done: true },
  { id: 2, title: "Build Components", done: false },
  { id: 3, title: "Master JSX", done: false },
];
const statusCode = 2;

// ==== Интерполяция переменных ====
const Greeting = () => <h2>{userName + " " + userIcon}</h2>;

// ==== Вывод даты ====
const CurrentDate = () => <p>Сегодня: {new Date().toLocaleDateString()}</p>;

// ==== Условный рендеринг (?:) ====
const LoginStatus = () => (
  <h3>Статус: {isLoggedIn ? "✅ Logged in" : "❌ Guest"}</h3>
);

// ==== Отображение списков ====
const FruitList = () => (
  <div>
    <h3>Список фруктов:</h3>
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  </div>
);

// ==== Работа с объектом ====
const UserCard = () => (
  <div style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "6px" }}>
    <h3>User Info:</h3>
    <p>
      {user.firstName} {user.lastName}
    </p>
  </div>
);

// ==== Условный рендеринг с && ====
const ShowMessage = () => (
  <div>
    <h3>Сообщение:</h3>
    {isLoggedIn && <p>🎉 Добро пожаловать, {userName}!</p>}
  </div>
);

// ==== Функция внутри JSX ====
const RandomNumber = () => (
  <div>
    <h3>Случайное число:</h3>
    <p>{Math.floor(Math.random() * 100)}</p>
  </div>
);

// ==== Динамический класс ====
const StatusText = () => {
  const statusClass = isLoggedIn ? "text-green" : "text-red";
  return <p className={statusClass}>{isLoggedIn ? "Онлайн" : "Офлайн"}</p>;
};

// ==== Динамические inline-стили ====
const DynamicStyle = () => {
  const style = {
    color: isLoggedIn ? "green" : "red",
    fontWeight: "bold",
    fontSize: "18px",
  };
  return <p style={style}>Статус через inline-стили</p>;
};

// ==== Динамическая кнопка ====
const DynamicButton = () => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <h3>Динамический класс кнопки:</h3>
      <button
        className={active ? "btn active" : "btn"}
        onClick={() => setActive(!active)}
      >
        {active ? "✅ Активна" : "⬜ Неактивна"}
      </button>
    </div>
  );
};

// ==== Обработка события onClick с API ====
const ClickButton = () => {
  const [items, setItems] = useState([]);

  const handleClick = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data = await res.json();
      setItems((prev) => [...prev, data.title]);
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    }
  };

  return (
    <div>
      <h3>Добавление текста из API:</h3>
      <button onClick={handleClick}>Загрузить текст</button>

      <ul>
        {items.map((txt, i) => (
          <li key={i}>{txt}</li>
        ))}
      </ul>
    </div>
  );
};

// ==== Рендер массива объектов ====
const TaskList = () => (
  <div>
    <h3>Список задач:</h3>
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.done ? "✅" : "⬜"} {task.title}
        </li>
      ))}
    </ul>
  </div>
);

// ==== Пример с children ====
const Card = ({ title, children }) => (
  <div
    style={{
      border: "2px solid #4caf50",
      padding: "12px",
      margin: "8px 0",
      borderRadius: "8px",
    }}
  >
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
);

// ==== Условный рендеринг через функцию (switch-case) ====
const StatusSwitch = () => {
  const renderStatus = (code) => {
    switch (code) {
      case 1:
        return <p>🟢 Всё хорошо</p>;
      case 2:
        return <p>🟡 Есть предупреждения</p>;
      case 3:
        return <p>🔴 Ошибка</p>;
      default:
        return <p>⚪ Неизвестно</p>;
    }
  };

  return (
    <div>
      <h3>Switch-case статус:</h3>
      {renderStatus(statusCode)}
    </div>
  );
};

// ==== Условное форматирование списка ====
const StyledTaskList = () => (
  <div>
    <h3>Список задач с условным форматированием:</h3>
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            color: task.done ? "green" : "gray",
            textDecoration: task.done ? "line-through" : "none",
          }}
        >
          {task.done ? "✅" : "⬜"} {task.title}
        </li>
      ))}
    </ul>
  </div>
);

// ==== Управляемый компонент (форма с useState) ====
const ControlledInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Вы ввели: ${value}`);
    setValue("");
  };

  return (
    <div>
      <h3>Форма с input:</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Введите текст..."
        />
        <button type="submit">Отправить</button>
      </form>
      <p>Текущее значение: {value}</p>
    </div>
  );
};

// ==== Модальное окно ====
const ModalExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h3>Модальное окно:</h3>
      <button onClick={() => setOpen(true)}>Открыть модалку</button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
              textAlign: "center",
            }}
          >
            <h4>Модальное окно</h4>
            <p>📦 Это содержимое модалки</p>
            <button onClick={() => setOpen(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==== Табы ====
const TabsExample = () => {
  const [active, setActive] = useState("tab1");

  return (
    <div>
      <h3>Табы:</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setActive("tab1")}>📑 Вкладка 1</button>
        <button onClick={() => setActive("tab2")}>📑 Вкладка 2</button>
        <button onClick={() => setActive("tab3")}>📑 Вкладка 3</button>
      </div>

      <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc" }}>
        {active === "tab1" && <p>📄 Контент первой вкладки</p>}
        {active === "tab2" && <p>📄 Контент второй вкладки</p>}
        {active === "tab3" && <p>📄 Контент третьей вкладки</p>}
      </div>
    </div>
  );
};

// ==== Аккордеон ====
const AccordionExample = () => {
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div>
      <h3>Аккордеон:</h3>
      {[1, 2, 3].map((id) => (
        <div key={id} style={{ border: "1px solid #ccc", margin: "5px 0" }}>
          <div
            style={{ padding: "10px", cursor: "pointer", background: "#f9f9f9" }}
            onClick={() => toggle(id)}
          >
            Раздел {id}
          </div>
          {open === id && <div style={{ padding: "10px" }}>📦 Контент раздела {id}</div>}
        </div>
      ))}
    </div>
  );
};

// ==== Rendering ====
const Rendering = () => {
  return (
    <div className="page">
      <Greeting />
      <CurrentDate />
      <LoginStatus />
      <FruitList />
      <UserCard />
      <ShowMessage />
      <RandomNumber />
      <StatusText />
      <DynamicStyle />
      <DynamicButton />
      <ClickButton />
      <TaskList />
      <Card title="Карточка с children">
        <p>📦 Это контент, переданный внутрь Card.</p>
        <button>Вложенная кнопка</button>
      </Card>
      <StatusSwitch />
      <StyledTaskList />
      <ControlledInput />
      <ModalExample />
      <TabsExample />
      <AccordionExample />
    </div>
  );
};

export default Rendering;





