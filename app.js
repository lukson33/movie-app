const input = document.getElementById("input");
const btn = document.getElementById("btn");
const more = document.getElementById("btn-load");

let pages = 1;

btn.addEventListener("click", () => {
  const value = input.value;

  async function getData() {
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    pages = 2;
    console.log(pages);
  }

  getData();
});

more.addEventListener("click", () => {
  const value = input.value;

  async function getData() {
    const API_KEY = "aa7add1a816db1a576175e4abfc544cf";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${value}&page=${pages}&include_adult=false`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.total_pages === pages) {
      console.log("no more pages");
      console.log(pages);
    } else {
      pages++;
      console.log(pages);
    }

    console.log(data);
    console.log(pages);
  }

  getData();
});
