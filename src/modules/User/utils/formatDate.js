// Utility functions or constants that are specific to the User module can be placed here. These utilities can be used by components, services, or other parts of the module to perform common tasks or calculations.

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export default formatDate;
