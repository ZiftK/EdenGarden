# EdenGarden ERP

EdenGarden ERP is a comprehensive Enterprise Resource Planning system designed to manage business operations efficiently. The system includes modules for employee management, team organization, and resource planning.

## Ejecución
Se debe tener Python instalado y ejecutar el script de shell simple-activate.ps1

## Features

-   👥 Employee Management
-   👥 Team Management
-   📊 Resource Planning
-   🔐 Role-based Access Control
-   💼 Employee Profiles
-   📱 Responsive Design

## Project Structure

```
EdenGarden/
├── backend/           # Python FastAPI backend
├── front_end/         # Next.js frontend
├── bd_data/          # Database related files
├── alembic_versions/ # Database migrations
└── venv/            # Python virtual environment
```

## Prerequisites

-   Python 3.8 or higher
-   Node.js 16.x or higher
-   PostgreSQL database
-   Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ZiftK/EdenGarden.git
cd EdenGarden
```

### 2. Backend Setup

```bash
# Create and activate virtual environment
python -m venv venv
# For Windows
.\venv\Scripts\activate
# For Unix/MacOS
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up the database
# Make sure PostgreSQL is running and create a database named 'edengarden'

# Run database migrations
alembic upgrade head

# Start the backend server
uvicorn main:app --reload
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd front_end

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application

-   Frontend: http://localhost:3000
-   Backend API: http://localhost:8000
-   API Documentation: http://localhost:8000/docs

## Environment Variables

Create `.env` files in both backend and frontend directories:

### Backend (.env)

```
DATABASE_URL=postgresql://[user]:[password]@localhost/edengarden
SECRET_KEY=your_secret_key
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development Team

This project is maintained by the EdenGarden development team.

## License

This project is private and confidential. All rights reserved.
