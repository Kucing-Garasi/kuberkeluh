const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
// TODO: change the URI to be loaded from env OR just adjust it to the correct one for dev
const genAI = new GoogleGenerativeAI("AIzaSyD6JfS1cmwuMXMkZJfvZB0E_lIzU7yz3-M"); // this key is still for the development

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default model;
