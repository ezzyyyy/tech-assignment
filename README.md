# Tech Assignment

This is a full-stack application consisting of a frontend built with Next.js React and a backend built with Express.js. The application allows users to upload CSV files, processes the data, and displays it in a paginated format (**server-side pagination** was used for this project).

Watch demo here: [DEMO](https://drive.google.com/file/d/1XNRInOjQwP0ZqdkpLh_0X6yLvT8RiY6o/view?usp=sharing)

In this project, data is saved in JSON as mock database. If had more time, would complete app with MongoDB for nosql storage.

Also wasnt able to complete jest tests, as just learnt unit testing for this project, but ran out of time 😅

Other Notes:

- [shadcn](https://ui.shadcn.com/) + [tailwindcss](https://tailwindcss.com/) - these two were used for quick styling of the frontend

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ezzyyyy/tech-assignment.git
cd tech-assignment
```

2. Install dependencies for both the frontend and backend:
install

```bash
cd mini-assignment-app
npm install

cd ../mini-assignment-backend
npm install
```

### Running the Application

Start the backend server:

```bash
cd mini-assignment-backend
npm start
```

The backend server will start on <http://localhost:8000>.

Start the frontend development server:

```bash
cd mini-assignment-app
npm run dev
```

The frontend server will start on <http://localhost:3000>.

Running Tests
To run the backend tests, use the following command:

```bash
cd mini-assignment-backend
npm test
```

Done!
