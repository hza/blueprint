# The Blueprint

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.9+)
- [VS Code](https://code.visualstudio.com/)

## Getting Started in VS Code

### 1. Open the project

```
File → Open Folder → select the customer-portal directory
```

### 2. Start the backend

Open a new terminal (`Ctrl+`` ` or **Terminal → New Terminal**) and run:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

### 3. Start the frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
customer-portal/
├── backend/        # FastAPI Python backend
│   ├── main.py
│   └── requirements.txt
├── frontend/       # React + Vite + TypeScript frontend
│   ├── src/
│   └── package.json
├── RFP/            # Input RFP documents
└── output/         # Analysis output files
```

## Available Scripts (frontend)

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
