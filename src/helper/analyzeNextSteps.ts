export const analyzeNextSteps = (
  step: any,
  userResponse: any,
  stepsData: any
) => {
  // Find the current step in the stepsData
  const currentStep = stepsData.find((item: any) => item.step === step);

  if (!currentStep) {
    return {
      purpose: "bye",
      message: "Bye!",
    };
  }

  // Handle conditional logic based on userResponse
  if (
    currentStep.conditional &&
    userResponse !== currentStep.conditional.userResponse
  ) {
    return {
      purpose: "not tell company info",
      message: "Aww... Well I guess you know what we do already.",
      options: ["Keep going."],
    };
  }

  // Generate the output, replacing {userResponse} if present
  const message = currentStep.message.replace("{userResponse}", userResponse);

  return {
    purpose: currentStep.purpose || "unknown",
    message: message,
    options: currentStep.options || [],
  };
};

export const stepsData = JSON.parse(`[
  {"step": 0, "message": "Nice to meet you, {userResponse}! It feels like I know you already. We have some job positions for you. Which of these call out to you?", "options": ["Frontend", "Backend", "Full Stack"]},
  {"step": 1, "message": "That's cool! Could you describe your experience in that field?"},
  {"step": 2, "message": "Did you do any projects that you're proud of? Can you tell me more about them? (class projects are cool too...)"},
  {"step": 3, "message": "Thanks for telling me that. Let's get personal... (just kidding). Could you tell me about yourself? How would you describe your personality?"},
  {"step": 4, "message": "Do you want me to explain what we do?", "options": ["Yeah sure!", "Meh, I'll pass"]},
  {"step": 5, "message": "Oh yay! This is what we do...", "conditional": {"userResponse": "Yeah sure!"}, "options": ["Keep going."]},
  {"step": 6, "message": "Now that you know what we do, how about you tell me why you want to work for us?"},
  {"step": 7, "message": "Alright, noted! One last question before we finish, besides coding/working, what do you do?"},
  {"step": 8, "message": "That sounds awesome! Right, it looks like we've got your application set. I would need your email to contact you if you're a good fit for this role!"},
  {"step": 9, "message": "Thank you so much for spending time chatting with me. Good luck with the application process! I hope we can meet soon. Bye!"}
]`);
