export const validateRegistrationForm = (formData) => {
  const { fullName, email, dateOfBirth, heardAboutEvent } = formData;

  if (!fullName || !email || !dateOfBirth || !heardAboutEvent) {
    return { isValid: false, message: "All fields are required" };
  }

  return { isValid: true };
};
