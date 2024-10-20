# Task Management App

## Setup Instructions
1. Clone the repo: `git clone https://github.com/singhsamiksha/Task-Management-App.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Features
- Add, Edit, Delete, and Mark Tasks as Completed.
- Sort by Priority (high, medium, low).
- Responsive design using CSS.

## Approach
Tasks are stored in an array and sorted dynamically based on priority using a simple priority sorting mechanism where "high" is ranked the highest, followed by "medium" and "low". Completed tasks are displayed at the bottom.

## Why useEffect over getServerSideProps
I would like to highlight that in Next.js 14, the use of getServerSideProps is not always required for fetching runtime data. Similar results can be achieved using useEffect to dynamically call APIs and retrieve backend data. This approach provides greater flexibility, as it allows data to be fetched at the client-side during runtime, which can be more efficient and adaptable depending on the specific use case.

