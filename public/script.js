document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const submitButton = form.querySelector('button[type="submit"]');

  /**
   * Appends a new message to the chat box.
   * @param {string} sender - The sender of the message ('user' or 'bot').
   * @param {string} text - The text content of the message.
   * @returns {HTMLElement} The created message element.
   */
  function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
    return msg;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const userMessage = input.value.trim();
    if (!userMessage) return;

    // 1. Add user's message to the chat box
    appendMessage('user', userMessage);
    input.value = '';

    // 2. Disable form and show a temporary "Thinking..." message
    input.disabled = true;
    submitButton.disabled = true;
    const thinkingMessage = appendMessage('bot', 'Gemini is thinking...');

    try {
      // 3. Send the user's message to the backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      if (!response.ok) {
        let errorMsg = `Server error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.error) {
            errorMsg = `Error: ${errorData.error}`;
          }
        } catch (jsonError) {
          // Response body is not JSON or couldn't be parsed.
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();

      // 4. Replace "Thinking..." with the AI's reply or an error message
      if (data && data.result) {
        thinkingMessage.textContent = data.result;
      } else {
        thinkingMessage.textContent = 'Sorry, no response received.';
      }
    } catch (error) {
      console.error('Error fetching chat response:', error);
      // 5. Show an error message in the chat box
      thinkingMessage.textContent = error.message;
    } finally {
      // 6. Re-enable the form for the next message
      input.disabled = false;
      submitButton.disabled = false;
      input.focus();
    }
  });
});
