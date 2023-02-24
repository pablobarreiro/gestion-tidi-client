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

export const formatNumber = (number)=>{
  if(!number) return '0'
  const string = number.toLocaleString().split('.')
  const integer = string[0].replace(/,/g, '.')
  const decimal = string[1]
  return decimal ? `${integer},${decimal}` : `${integer}`
}

export const formatDate = (date) => {
  return date.split('T')[0].replace(/-/g, "/")
}