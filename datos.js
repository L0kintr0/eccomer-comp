function getDataFromLocalStorage() {
  const storedData = localStorage.getItem('dataStorage');

  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return [];
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById('submit');
  button.addEventListener("click", () => {
  
  });
});
