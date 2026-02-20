const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY.trim());
const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

const generateResponse = async (messages)=>{
    try {
        if(!messages || messages.length === 0){
            throw new Error("Messages array is empty");
        }
        const formattedHistory = messages.map((msg)=>({
            role: msg.role,
            parts: [{text: msg.content }],
        }))

        const history = formattedHistory.slice(0, -1);
        const latestMessage = formattedHistory[formattedHistory.length -1 ].parts[0].text;
        
        const chat = model.startChat({
            history,
        })

        const result = await chat.sendMessage(latestMessage);
        const responseText = result.response.text();
        return responseText;
    } catch(error) {
        console.error("Gemini Error: ", error.message);
        throw new Error("Failed to generate AI response");
    }
}

module.exports = generateResponse;