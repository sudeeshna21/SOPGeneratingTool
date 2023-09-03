const openAIConfig = {
  OPENAI_API_KEY: "",
};

const brevoConfig = {
  url: "https://api.sendinblue.com/v3",
  apiKey:
    "",
  sender: {
    senderName: "Team Effizient",
    senderEmail: "sinfo@effizient.ca",
  },
  template: 1,
};

export const config = {
  openAI: openAIConfig,
  brevo: brevoConfig,
};
