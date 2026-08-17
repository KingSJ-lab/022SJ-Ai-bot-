const chatBox = document.getElementById("chat");

// UI
function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message to AI
async function getAIResponse(message) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY_HERE"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful AI assistant." },
                { role: "user", content: message }
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// Controller
async function handleSend() {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    addMessage("Typing...", "bot");

    const botMessage = await getAIResponse(text);

    chatBox.lastChild.remove(); // remove "Typing..."
    addMessage(botMessage, "bot");
}

// welcome
addMessage("SJ AI Bot v4 is now connected to real AI 🤖", "bot");
