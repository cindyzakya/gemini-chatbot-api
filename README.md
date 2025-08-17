# Gemini AI Chatbot
A simple, yet powerful web-based chatbot powered by the Google Gemini API. This project features a Node.js + Express backend and a clean, framework-free Vanilla JavaScript frontend.

## 🚀 Features
- **Conversational AI:** Engage in dynamic conversations with Google's `gemini-2.5-flash` model.
- **Context-Aware:** The chatbot remembers the previous turns in the conversation for follow-up questions.
- **Simple UI:** A clean and intuitive chat interface built with HTML, CSS, and Vanilla JavaScript.
- **Real-time Feedback:** Displays a "thinking..." indicator while waiting for the AI's response.
- **Robust Backend:** A single, easy-to-understand API endpoint built with Node.js and Express.
- **Error Handling:** Gracefully handles API errors and informs the user.

## ⚙️ Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **AI:** Google Gemini API (`@google/genai`)
- **Dependencies:** `cors`, `dotenv`

---

## 🛠️ Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- **Node.js:** Make sure you have Node.js installed (v18 or higher is recommended). You can download it from nodejs.org.
- **npm:** Node Package Manager, which comes with Node.js.
- **Google Gemini API Key:** You'll need an API key to use the Gemini API. You can obtain one for free from Google AI Studio.

### Installation & Setup
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/cindyzakya/gemini-chatbot-api.git
    cd gemini-chatbot-api
    ```
2.  **Install dependencies:**
    ```bash
    npm init -y
    ```
    ```bash
    npm install express dotenv cors @google/genai
    ```
    ```bash
    npm install nodemon -g
    ```
3.  **Create a `.env` file with your Gemini API key:**
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```
4.  **Start the server:**
    ```bash
    nodemon index.js
    ```
    The server will start, and you should see a confirmation message in your terminal:
    `Server ready on http://localhost:3000`

---

## Usage
Once the server is running, open your web browser and navigate to:
`http://localhost:3000`.
You can now start chatting with the AI! Type a message in the input box and press "Send" or hit Enter.

## API Endpoint
The backend exposes a single API endpoint for the chat functionality.
#### `POST /api/chat`
-   **Description:** Receives a conversation history and returns a response from the Gemini model.
-   **Request Body:**
    ```json
    {
      "messages": [
        { "role": "user", "content": "Hello!" },
        { "role": "model", "content": "Hi there! How can I help you today?" },
        { "role": "user", "content": "What is Node.js?" }
      ]
    }
    ```
-   **Success Response (`200 OK`):**
    ```json
    {
      "result": "<The AI-generated response text>"
    }
    ```