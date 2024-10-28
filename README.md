# Panda Test task, completed by Zhelieznova Valeriia


Technologies used: 
- Vue 3 
- Typescript 
- Vite
- axios
- Chart.js (for charts)
- Pinia (state manager)
- i18n for multiple locales
- moment (date/time formatting with locales)

Link: https://vzhlznva-panda-test.web.app/

Djinni profile: https://djinni.co/q/af2b1f7b99/

## Work done: 
1. **City Autocomplete Input**: Implemented search for cities using an autocomplete input field, allowing for quick and accurate city selection. However, there were some _challenges with this feature_: the autocomplete input does not support the Ukrainian language and does not trigger on every keystroke due to restrictions from the GeoDB API.
2. **Current Weather Display**: The app presents the current weather conditions in a card format, showcasing essential information such as day of the week, time, temperature, weather description, feels like.
3. **Hourly Temperature Chart and 5-days weather chart and corresponding cards to charts**: I integrated a temperature chart that displays hourly temperature forecasts for the current day, utilizing a JavaScript plugin such as Chart.js. However, I encountered limitations with the OpenWeatherMap API that only provides weather data every three hours. Unfortunately, the hourly forecast functionality is currently a paid feature, which I was unable to implement.
4. **Multiple Weather Blocks**: Implemented creating up to five weather blocks, each representing different cities. By default, the application starts with one block with **current weather located by users IP address**, and additional blocks can be added by clicking a "+" button.
5. **Block Deletion with Confirmation**: Implemented the option to delete any weather block. A modal confirmation window appears to ensure that the deletion is intentional.
6. **Favorites Tab**: The application includes a "Favorites" tab where users can save up to five cities. Users can add or remove cities from their favorites, with the selected favorites being stored in localStorage. If the user attempts to exceed the limit, a modal notification informs them to remove a city first.
7. **Responsive Design**: The application is designed to be fully responsive, ensuring a seamless experience on devices ranging from a minimum width of 360px to a maximum of 1200px.
8. **Language Support**: Implemented multilingual support for the interface, allowing users to switch between English and Ukrainian.
9. **Today's Highlights block**: Implemented block with current information about wind speed, humidity percentage, visibility and sunrize/sunset time for location.

## Getting started

First of all, the project used pnpm as package manager, so you can either install pnpm, using
```
npm i -g pnpm
```

or skip this step and use npm, or yarn to get started.


To start a project you need to perform the following steps:


Using pnpm:

```
pnpm i
pnpm run dev
```


Using npm

```
npm i
npm run dev
```


Using yarn

```
yarn i
yarn run dev
```

As a result of following these steps, we have a running project. 

## Additional information
The project is also hosted and uses Google Firebase and GitHub CI/CD, so you can check out the project as well at https://vzhlznva-panda-test.web.app/

