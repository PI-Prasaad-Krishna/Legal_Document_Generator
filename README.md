# LexiGen AI ⚖️

**Smart Legal Documents, Instantly.**

LexiGen AI is an intelligent, web-based platform designed to democratize access to legal documentation. By leveraging the power of state-of-the-art Large Language Models, LexiGen empowers freelancers, startups, and small businesses to generate professional, legally-sound documents in minutes through a simple, intuitive interface.

---

## ✨ Built for Hack The Horizon 2.0

This project was proudly developed in 24 hours for the **Hack The Horizon 2.0** hackathon at VIT Chennai (August 13-14, 2025). It represents our passion for using AI to solve tangible, real-world problems.

**Track:** AI & Machine Learning

---

## 🚀 Key Features

* **Dynamic Document Generation:** Select from a growing library of legal templates, including Rental Agreements and Non-Disclosure Agreements (NDAs).
* **Intuitive Form-Based UI:** A guided, step-by-step form ensures all necessary details are captured accurately, tailored to the specific document type.
* **AI-Powered Drafting:** Utilizes advanced LLMs via the OpenRouter API to generate comprehensive, well-structured legal text based on user input.
* **Instant Preview & Download:** Review the generated document in a clean preview modal and download it as a professional PDF with a single click.
* **Secure User Authentication:** Built with Firebase, ensuring that user data and generated documents are kept private and secure.
* **Polished & Animated UI:** A smooth, modern user experience built with React, Tailwind CSS, and Framer Motion.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, Tailwind CSS
* **Animations:** Framer Motion
* **AI Integration:** OpenRouter API (Mistral 7B Instruct)
* **Authentication:** Firebase Auth
* **PDF Generation:** html2pdf.js
* **Routing:** React Router

---

## ⚙️ Setup and Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/PI-Prasaad-Krishna/Legal_Document_Generator.git](https://github.com/PI-Prasaad-Krishna/Legal_Document_Generator.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Legal_Document_Generator
    ```
3.  **Install NPM packages:**
    ```bash
    npm install
    ```
4.  **Set up environment variables:**
    * Create a `.env` file in the root of the project.
    * Add your Firebase and OpenRouter API keys:
      ```
      VITE_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
      VITE_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
      # ... (add all other Firebase keys)

      VITE_OPENROUTER_API_KEY="YOUR_OPENROUTER_API_KEY"
      ```
5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 📖 How It Works

1.  **Select a Document:** The user chooses a document type (e.g., Rental Agreement).
2.  **Fill the Form:** A dynamic form appears, prompting the user for specific details relevant to the chosen document.
3.  **Generate:** The application constructs a detailed, structured prompt from the form data.
4.  **Call the AI:** This prompt is sent to the OpenRouter API. The AI uses this information to generate a full, legally-sound document formatted in HTML.
5.  **Preview & Download:** The generated HTML is displayed in a preview modal. The user can then download the document as a perfectly formatted PDF.

---

## 👥 The Team

* [@PI-Prasaad-Krishna](https://github.com/PI-Prasaad-Krishna)
* [@Risha-Jayaraj](https://github.com/Risha-Jayaraj)
* [@aadityashah07](https://github.com/aadityashah07)
* [@ashfaqhameeed](https://github.com/ashfaqhameeed)
