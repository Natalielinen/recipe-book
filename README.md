# Code styleguide
## Экспорты компонентов и функций

Экспорты компонентов именованные; стрелочные функции.
```tsx
export const MyComponent = () => {

}
```

Экспорты страниц дефолтные, обычная функция.
```tsx
export default function Home() {}
```

В папках с компонентами и функциями делаем реэкспорт из индекса.

## Использование хуков и функций React

Все хуки и другие функции из реакта импортируем, не пишем так:
`React.useState()`, делаем так:
```tsx
import { useState } from 'react';

const [state, setState] = useState(null);
```
## Типизация
Типизация компонентов через FC

```tsx
export const Component: React.FC<ComponentProps> = ({ prop1 }) => {}
```

Названия типов для пропсов компонента <componentName>Props:

```tsx
type ComponentProps = {
    prop1: string;
}
```

## Архетикрура компонента

Сначала идут данные, потом их получение и обработка, после этого ui

```tsx
const { ьodalOpen, setModalOpen } = useStore((state) => state); // сначала данные из стора
const [state, setState] = useState(null); // после  данные самого компонента

useEffect(() => { // обработка данных
    setState("data");
}, []);

return <div>{state}</div> // UI
```