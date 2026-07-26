
Photo Gallery

A responsive photo browsing application built with Angular 22. Users can explore a continuously loaded photo stream, open a dedicated details page, and save their favorite photos locally.

Application Routes

Route :  / /photos/:id  /favorites


Description: 
Displays the main photo stream
Displays the selected photo and its details
Displays the photos saved as favorites


Tech Stack

Angular 22

TypeScript

Angular standalone components

Angular Router

Angular Material

Angular Signals

RxJS

SCSS

Lorem Picsum API

Browser localStorage

Vitest / Angular TestBed

Architecture

The application uses a feature-based structure that keeps business functionality separate from reusable and application-wide code.

## Project Structure

```text
src/app/
├── core/
│   └── storage/
├── features/
│   ├── favorites/
│   │   ├── services/
│   │   └── pages/
│   └── photos/
│       ├── services/
│       ├── models/
│       └── pages/
├── shared/
│   └── components/
│       ├── app-header/
│       ├── load-more-trigger/
│       ├── photo-card/
│       └── photo-grid/
└── app.routes.ts
```

Contains application-wide infrastructure. The storage service wraps browser storage access, so feature code does not depend directly on localStorage.

Features

Contains functionality grouped by business area:

photos handles photo retrieval, the photo stream, and photo details.

favorites manages the user's saved photos and their persistence.

Shared

Contains reusable presentational components used across multiple features, such as the header, photo card, photo grid, and infinite-scroll trigger.

This separation keeps page components focused on orchestration while reusable components receive data through inputs and communicate through outputs.

Data Flow

Photos are loaded from the public Lorem Picsum API. The application requests paginated data and appends each new result to the current stream.

Photo page
   → Photo API service
   → Lorem Picsum API
   → Photo state

   Getting Started

Prerequisites

Node.js 20 or newer

npm

Angular CLI 22

Installation

git clone https://github.com/laurentiubl/-photo-lib-XM-Final.git
cd -photo-lib-XM-Final
npm install

Run the application

npm start
   → Photo grid

   Infinite Scrolling

Infinite scrolling is implemented with a reusable LoadMoreTrigger component based on IntersectionObserver.
