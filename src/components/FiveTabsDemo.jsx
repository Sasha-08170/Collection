// FiveTabsDemo.jsx

import React, { useState, useCallback, memo } from 'react';
import './Tabs.css'; 

/**
 * Вспомогательный компонент TabButton
 * Отображает кнопку для переключения между вкладками.
 * Используем `memo` для оптимизации, чтобы кнопка ререндерилась только при изменении своих пропсов.
*/

const TabButton = memo(({ children, isActive, onClick }) => {
  console.log(`Рендер TabButton: ${children}, isActive: ${isActive}`);
  return (
    <button
      className={`tab-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

/**
 * Компонент Tabs
 * Демонстрирует паттерн UI "Вкладки".
 * Он управляет состоянием активной вкладки и отображает соответствующий контент.
*/

const Tabs = memo(({ children }) => {
  // Состояние для хранения индекса активной вкладки. По умолчанию активна первая вкладка (индекс 0).
  const [activeTab, setActiveTab] = useState(0);

  // `useCallback` мемоизирует функцию `handleTabChange`.
  // Это предотвращает пересоздание функции при каждом рендере компонента `Tabs`,
  // что важно для оптимизации, особенно если `TabButton` обернут в `memo`.
  const handleTabChange = useCallback((index) => {
    setActiveTab(index);
  }, []); // Пустой массив зависимостей означает, что функция создается один раз при монтировании.

  console.log('Рендер компонента Tabs');

  return (
    <div className="tabs-container">
      <div className="tab-buttons">
        {/*
          React.Children.map позволяет итерировать по дочерним элементам,
          которые передаются компоненту Tabs.
          Каждый дочерний элемент (в нашем случае TabPanel) будет соответствовать кнопке.
        */}
        {React.Children.map(children, (child, index) => (
          <TabButton
            key={index} // `key` важен для React для эффективного обновления списков
            isActive={index === activeTab} // Проверяем, является ли текущая вкладка активной
            onClick={() => handleTabChange(index)} // Устанавливаем обработчик клика для переключения вкладки
          >
            {/* Используем пропс `title` из дочернего `TabPanel` для текста кнопки.
                Если `title` не указан, используем дефолтное название "Вкладка N". */}
            {child.props.title || `Вкладка ${index + 1}`}
          </TabButton>
        ))}
      </div>
      <div className="tab-content">
        {/*
          React.Children.toArray преобразует дочерние элементы в массив,
          чтобы мы могли получить доступ к элементу по его индексу.
          Отображаем только содержимое активной вкладки.
        */}
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
});

/**
 * Вспомогательный компонент TabPanel
 * Используется как дочерний элемент для компонента Tabs.
 * Он просто оборачивает содержимое вкладки и предоставляет пропс `title`.
 */
const TabPanel = ({ children, title }) => {
  // Примечание: `TabPanel` обычно не обертывается в `memo`,
  // так как его видимость управляется родительским `Tabs` компонентом,
  // который рендерит только активный `TabPanel`.
   console.log(`Рендер TabPanel: ${title}`);
  return <div className="tab-panel">{children}</div>;
};

/**
 * Основной компонент FiveTabsDemo
 * Содержит демонстрацию переключателя из пяти вкладок.
 */
const FiveTabsDemo = () => {
  console.log('Рендер компонента FiveTabsDemo');

  return (
    <div className="five-tabs-demo-app">
      <h1>Вкладки</h1>

      <section className="tabs-section">
        <Tabs>
          {/* Первая вкладка */}
          <TabPanel title="Главная">
            <p>Добро пожаловать на главную страницу!</p>
            <p>Здесь вы найдете общую информацию о нашем приложении.</p>
            <p>Текущее время: {new Date().toLocaleTimeString()}</p>
          </TabPanel>

          {/* Вторая вкладка */}
          <TabPanel title="Продукты">
            <h3>Список продуктов</h3>
            <ul>
              <li>Ноутбук Pro</li>
              <li>Смартфон X</li>
              <li>Наушники Ultra</li>
            </ul>
            <p>Загляните в наш каталог для более подробной информации.</p>
          </TabPanel>

          {/* Третья вкладка */}
          <TabPanel title="Сервисы">
            <p>Мы предлагаем следующие услуги:</p>
            <ol>
              <li>Консалтинг</li>
              <li>Разработка ПО</li>
              <li>Техническая поддержка</li>
            </ol>
            <button onClick={() => alert('Заказать услугу!')}>Заказать</button>
          </TabPanel>

          {/* Четвертая вкладка */}
          <TabPanel title="О нас">
            <p>Мы — команда профессионалов, увлеченных созданием инновационных решений.</p>
            <p>Наша миссия - упростить вашу жизнь с помощью технологий.</p>
            <p>Спасибо, что выбрали нас!</p>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
};

export default FiveTabsDemo;