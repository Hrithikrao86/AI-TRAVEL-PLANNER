# AI Travel Planner

## Project Overview

AI Travel Planner is a full-stack web application that helps users generate personalized travel itineraries using Google Gemini AI.

Users can:

* Register and login securely
* Generate AI-powered travel itineraries
* Get estimated travel budgets
* View hotel recommendations
* Add, remove, and regenerate itinerary activities
* Maintain an interactive packing checklist
* Save and manage multiple trips

---

## Tech Stack

### Frontend

* Next.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB Atlas
* Mongoose

### AI

* Google Gemini API

---

## Features

### Authentication & Authorization

* JWT based authentication
* Protected routes
* User-specific dashboards
* Strict data isolation between users

### AI Itinerary Generator

Users provide:

* Destination
* Duration
* Budget type
* Interests

Gemini AI generates:

* Day-by-day itinerary
* Activities
* Meals
* Budget estimation
* Hotel recommendations

### Editable Itinerary

Users can:

* Add activities
* Remove activities
* Regenerate a specific day with custom instructions

### Smart Packing Assistant (Custom Feature)

The application automatically generates a packing list based on:

* Destination
* Trip duration
* Activities
* Travel style

Items are grouped into:

* Documents
* Clothing
* Gear
* Other

Users can mark items as packed and the state is stored in MongoDB.

**Why built?**

Travelers often forget important items or struggle to pack appropriately for activities and climate. This feature acts as an AI-powered packing assistant that creates a personalized checklist.

---

## Architecture

Frontend (Next.js)

↓

REST APIs

↓

Backend (Express.js)

↓

MongoDB Atlas

↓

Google Gemini API

---

## Environment Variables

### Backend

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_key
```

### Frontend

```env
NEXT_PUBLIC_API_URL=your_backend_url
```

---

## Local Setup

### Backend

```bash
cd backend

npm install

npm run dev
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Deployment

### Frontend

Deployed on Vercel

### Backend

Deployed on Render

---

## Key Design Decisions

* JWT authentication for secure user sessions
* MongoDB Atlas for scalable cloud database
* Gemini AI for itinerary generation
* Modular Express architecture with controllers, routes, and middleware
* Persistent packing checklist stored in MongoDB

---

## Known Limitations

* AI responses may occasionally vary in structure.
* Hotel recommendations are AI-generated and not fetched from live booking APIs.
* Travel costs are estimated and may not reflect real-time prices.
