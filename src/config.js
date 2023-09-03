const openAIConfig = {
  OPENAI_API_KEY: "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",
};

const brevoConfig = {
  url: "https://api.sendinblue.com/v3",
  apiKey:
    "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",
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
