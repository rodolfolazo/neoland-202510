import axios from "axios";

export function notifyUserRegistered(userData) {
  return axios
    .post(process.env.N8N_WEBHOOK_URL, userData, { timeout: 5000 })
    .catch((error) => {
      console.error("Error notifying n8n:", error.message);
    });
}
