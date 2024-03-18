export const minLength = (length) => {
  return {
    minLength: {
      value: length,
      message: `Too short. Must be atleast ${length} characters`,
    },
  };
};

export const maxLength = (length) => {
  return {
    maxLength: {
      value: length,
      message: `Too long. Must be atleast ${length} characters`,
    },
  };
};

export const requiredField = (fieldName = "") => {
  const msg = fieldName ? `${fieldName} is required` : `This field is required`;
  return { required: msg };
};
