![World Story](https://github.com/srshubho26/srshubho26/blob/main/worldStory.png?raw=true)

# WorldStory

WorldStory is a blog based website. Here user can browse different blogs based on different categories according to their needs. This website is built using react and firebase realtime database.

## Technologies:
- React
- Tailwind
- Firebase
- Firebase Realtime Database

## Features
- Browse different blogs
- Pagination for blogs
- Filter blogs by categories
- Users can update their own profile
- Users can publish their own blog
- Users can update and delete their own blogs

## Dependencies: 
- @tinymce/tinymce-react: ^5.1.1
- axios: ^1.7.9
- firebase: ^11.0.1
- localforage: ^1.10.0
- match-sorter: ^7.0.0
- prop-types: ^15.8.1
- react: ^18.3.1
- react-dom: ^18.3.1
- react-icons: ^5.3.0
- react-router-dom: ^6.27.0
- react-toastify: ^10.0.6
- sort-by: ^1.2.0
- sweetalert: ^2.1.2
- react-helmet-async: ^2.0.5

## DevDependencies:
- @eslint/js: ^9.13.0
- @types/react: ^18.3.11
- @types/react-dom: ^18.3.1
- @vitejs/plugin-react: ^4.3.3
- autoprefixer: ^10.4.20
- daisyui: ^4.12.14
- eslint: ^9.13.0
- eslint-plugin-react: ^7.37.1
- eslint-plugin-react-hooks: ^5.0.0
- eslint-plugin-react-refresh: ^0.4.13
- globals: ^15.11.0
- postcss: ^8.4.47
- tailwindcss: ^3.4.14
- vite: ^5.4.9

## Run On Local Machine
- Run `git clone https://github.com/shuvo22890/world-story.git` on your local machine
- After cloning run `cd world-story`
- Then run `npm install`
- Creat an `.env.local` file on the root folder of project and paste the following code
- `VITE_API_KEY=`
- `VITE_AUTH_DOMAIN=`
- `VITE_PROJECT_ID=`
- `VITE_STORAGE_BUCKET=`
- `VITE_MESSAGING_SENDER_ID=`
- `VITE_APP_ID=`
- `VITE_DATABASE_URL=`
- Create an firebase project and get the credentials and place them on the env file
- A `data.json` file is attached on the root of the project. Import the data on your firebase realtime database
- Finally run `npm run dev`

## Live Link:
https://world-story-9879d.web.app
