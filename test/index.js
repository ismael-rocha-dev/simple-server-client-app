async function makeRequests() {
  for (let i = 1; i <= 11; i++) {
    fetch("http://localhost:5000/api/test")
      .then((response) => {
        console.log(i, "- response: ", response.statusText);
      })
      .catch((error) => {
        console.log(i, "- response: ", error.statusText);
      });
  }
}

makeRequests();
