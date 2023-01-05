export const isValidDate = (dateString) => {
  // Returns true if dateString is a string with AAAA/MM/DD format
  const dateObject = new Date(dateString);
  if (Object.prototype.toString.call(dateObject) === "[object Date]") {
    if (!isNaN(dateObject.getTime())) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
