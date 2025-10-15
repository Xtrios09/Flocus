
# ⏰ Flocus Timer App

>A beautiful, modern productivity app built with Next.js, React, and Tailwind CSS. Combines a Pomodoro timer, persistent Todo list, and a music playlist for focused work—all in one seamless experience.

---

## ✨ Features

- **Pomodoro Timer**: Minimal, persistent timer with work/break cycles and a circular progress ring. State is saved even if you navigate away.
- **Todo List**: Add, edit, and delete tasks. Your list is saved in your browser (localStorage) and styled for clarity and focus.
- **Music Playlist**: Embedded Spotify playlist for background focus music. Music playback persists as you switch between app sections.
- **Theme**: Modern dark theme with a clean, aesthetic UI. (Easily customizable in `globals.css`.)
- **Responsive**: Works beautifully on desktop and mobile.
- **Fast**: Powered by Next.js 15 and React 19 for instant navigation and updates.

---

## 🚀 Quick Start

1. **Clone the repository**
	 ```bash
	 git clone <your-repo-url>
	 cd timerapp
	 ```

2. **Install dependencies**
	 ```bash
	 npm install
	 # or
	 yarn install
	 # or
	 pnpm install
	 ```

3. **Run the development server**
	 ```bash
	 npm run dev
	 # or
	 yarn dev
	 # or
	 pnpm dev
	 ```

4. **Open your browser**
	 Visit [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Biome](https://biomejs.dev/) (formatting/linting)
- [Headless UI](https://headlessui.dev/) & [Heroicons](https://heroicons.com/)
- [React Bootstrap](https://react-bootstrap.github.io/) (for some UI elements)
- [Spotify Embed](https://developer.spotify.com/documentation/embeds)

---

## 📦 Project Structure

```
timerapp/
	public/
	src/
		app/
			globals.css         # Global styles & theme
			layout.tsx          # App layout
			page.tsx            # Main entry
		components/
			Pomodoro.tsx        # Pomodoro timer
			Todolist.tsx        # Todo list
			MymusicPlaylist.tsx # Music player
			MyNavbar.tsx        # Navigation bar
			...
		context/
		types/
	package.json
	README.md
```

---

## 📝 Usage

- **Pomodoro**: Click "Focus" in the navbar. Start, pause, or reset the timer. Timer state is saved automatically.
- **Todo List**: Click "Todo-List". Add, edit, or delete tasks. Your list is always saved.
- **Music**: Click "Music". The playlist keeps playing even if you switch sections.

---

## 🧑‍💻 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint code with Biome
- `npm run format` — Format code with Biome

---

## 📄 License

MIT — Free for personal and commercial use.
