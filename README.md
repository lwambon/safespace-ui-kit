# SafeSpace: AI-Powered Digital Violence Prevention Platform

## Overview

SafeSpace is a web-based application designed to combat digital violence and provide immediate support to individuals facing online harassment. It leverages real-time threat analysis, offers a rapid emergency response system, and provides access to educational resources and survivor support networks. The platform is built with a focus on user privacy, speed, and accessibility, utilizing a modern tech stack to deliver a secure and responsive experience.

Our mission is to create a safer digital environment by empowering users with tools to protect themselves and access help when they need it most. The project's name, 'SafeSpace', reflects this core commitment.

## Core Features

- **Real-time Harassment Detection:** A sophisticated monitoring system analyzes incoming digital communications (e.g., social media comments, messages) for harmful content. The threat level is visualized through a dynamic, generative art display that changes in intensity and color based on the detected risk.
- **Emergency Response System:** A floating action button (FAB) provides one-tap access to an emergency modal. This system includes:
    - A 10-second countdown to prevent false alarms.
    - Automated sharing of the user's location with trusted contacts.
    - Covert audio recording for evidence collection.
    - A 'safe word' feature to discreetly cancel the alert.
- **Anonymous Survivor Support:** A dedicated page offering resources, articles, and links to real-world support organizations. This section is designed to be a safe, anonymous space for users to find help and information.
- **Gamified Educational Modules:** Interactive learning modules that teach users how to recognize, report, and protect themselves from various forms of digital violence. Users can unlock modules sequentially, complete quizzes, and earn achievement badges to encourage engagement.
- **Integrated Home Dashboard:** A central hub that provides an at-a-glance view of the user's safety status, quick access to all major features, and a seamless user experience.
- **Loading Screen:** A simple, calming loading screen featuring the 'SafeSpace' logo to ensure a smooth initial entry into the application.

## Tech Stack

- **Frontend:** React 19.1.1, Vite, Tailwind CSS
- **UI/UX:** 
    - **Icons:** Lucide React for crisp, lightweight icons.
    - **Animations:** Framer Motion for smooth page transitions and component animations.
    - **Notifications:** Sonner for non-intrusive toast notifications.
    - **Styling:** Tailwind CSS with a custom theme designed for clarity, trust, and accessibility.

## Design Philosophy

The UI/UX of SafeSpace is guided by three principles:

1.  **Safety & Trust:** The color palette uses calming and authoritative colors. Blues and grays establish a sense of security, while reds and oranges are reserved for critical alerts.
2.  **Simplicity & Clarity:** The interface is minimalist and intuitive, ensuring that users can find and use critical features quickly, especially under stress.
3.  **Empowerment:** The design avoids creating a sense of fear. Instead, it aims to empower users by giving them control over their digital safety through clear, accessible tools.

## Installation and Setup

**Prerequisites:**
- Node.js (v18 or higher)
- npm

**Running the project locally:**

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd safespace-project
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173`.

## Usage

- **Navigate** through the app using the header links: Home, Education, and Support.
- **Monitor** your digital safety status on the Home page via the Harassment Status component.
- **Activate** the emergency system by clicking the shield icon FAB in the bottom-right corner.
- **Explore** educational content in the 'Educational Modules' page.
- **Find** resources and help in the 'Survivor Support' page.