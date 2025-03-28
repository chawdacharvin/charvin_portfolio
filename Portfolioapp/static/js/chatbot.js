document.addEventListener("DOMContentLoaded", function () {
    const chatbotBtn = document.getElementById("chatbot-btn"); // Floating button
    const chatbotSidebar = document.getElementById("chatbot-sidebar"); // Sidebar
    const closeChatbot = document.getElementById("close-chatbot"); // Close button
    const userInput = document.getElementById("user-input"); // Input field
    const sendBtn = document.getElementById("send-btn"); // Send button
    const chatBox = document.getElementById("chat-box"); // Chat message container
    const chatForm = document.getElementById("chat-form"); // Chat form

    // ✅ Prevent form submission (Enter key)
    chatForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop form submission
        sendMessage();
    });

    function sendMessage() {
        let message = userInput.value.trim();
        if (message === "") return;

        // Append User Message
        let userMsg = document.createElement("div");
        userMsg.className = "chat-message user-message";
        userMsg.innerHTML = message;
        chatBox.appendChild(userMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
        userInput.value = "";

        // Send Message to Backend
        fetch("/chatbot/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken()
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            let botMsg = document.createElement("div");
            botMsg.className = "chat-message bot-message";
            botMsg.innerHTML = data.response;
            chatBox.appendChild(botMsg);
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => console.error("Error:", error));
    }

    // ✅ Get CSRF Token
    function getCSRFToken() {
        let tokenElement = document.querySelector("[name=csrfmiddlewaretoken]");
        return tokenElement ? tokenElement.value : "";
    }

    // ✅ Open & Close Chatbot Sidebar (Fixed)
    chatbotBtn.addEventListener("click", function () {
        chatbotSidebar.style.right = "0"; // Fully open
        chatbotBtn.style.display = "none"; // Hide button
    });

    closeChatbot.addEventListener("click", function () {
        chatbotSidebar.style.right = "-400px"; // Ensure fully off-screen
        setTimeout(() => {
            chatbotBtn.style.display = "block"; // Show button after closing
        }, 300);
    });

    // ✅ Allow "Enter" key to send message
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});