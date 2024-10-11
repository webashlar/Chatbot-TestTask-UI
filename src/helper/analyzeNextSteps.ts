export const rootURL  = "https://ad6c-103-250-151-79.ngrok-free.app"

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
  if (currentStep.conditional) {
    const condition = currentStep.conditional.find(
      (condition: any) => condition.userResponse === userResponse
    );

    if (!condition) {
      return {
        purpose: "not tell company info",
        message: "Aww... Well I guess you know what we do already.",
        options: ["Keep going."],
      };
    }

    // Use the options from the matched condition if available
    const options = condition.options || [];
    const conditionalMessage = condition.message || currentStep.message;

    return {
      purpose: currentStep.purpose || "unknown",
      message: conditionalMessage.replace("{userResponse}", userResponse),
      options: options,
    };
  }

  // If no condition, return the default message and options
  return {
    purpose: currentStep.purpose || "unknown",
    message: currentStep.message.replace("{userResponse}", userResponse),
    options: currentStep.options || [],
  };
};
