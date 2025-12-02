# DevConnect
DevConnect is a React and Node.js based developer directory featuring role-based filtering, tech stack search, and a modular API.

## Features
- Add developer with name, role, tech stack, and experience  
- Search developers by name  
- Filter by role and technologies   
- Responsive design  
- Simple Node and Express API  
- JSON or MongoDB storage (any one)

## Tech Stack
**Frontend:** React, Vite, Tailwind CSS, shadcn/ui, React Query  
**Backend:** Node.js, Express  
**Deployment:** Netlify

## Folder Structure
```md
DevConnect/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── utils/
│   └── data/
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── lib/
│   │   └── styles/
│
└── README.md

```
## Running Frontend
```bash
cd frontend
npm install
npm run dev
```
## Running Backend
``` bash
cd backend
npm install
npm start
```

