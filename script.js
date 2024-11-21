// Define the API endpoint
const apiEndpoint = "https://disease.sh/v3/covid-19/all";

// Fetch the COVID-19 data
fetch(apiEndpoint)
  .then((response) => response.json())
  .then((data) => {
    // Get the necessary data
    const totalCases = data.cases;
    const totalDeaths = data.deaths;
    const totalRecovered = data.recovered;

    // Update the HTML with the fetched data
    document.getElementById("total-cases").textContent =
      totalCases.toLocaleString();
    document.getElementById("total-deaths").textContent =
      totalDeaths.toLocaleString();
    document.getElementById("total-recovered").textContent =
      totalRecovered.toLocaleString();

    // Create a bar chart using Chart.js
    const ctx = document.getElementById("covidBarChart").getContext("2d");
    const covidBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Cases", "Deaths", "Recovered"],
        datasets: [
          {
            label: "COVID-19 Statistics",
            data: [totalCases, totalDeaths, totalRecovered],
            backgroundColor: ["#FF5733", "#C70039", "#28B463"],
            borderColor: ["#FF5733", "#C70039", "#28B463"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Placeholder for D3.js visualization (future feature)
    const width = 960;
    const height = 500;

    // Set up an SVG element for D3 visualization (optional - here you can create a world map or a graph)
    const svg = d3
      .select("#covidMap")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg
      .append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", 50)
      .style("fill", "steelblue");
  })
  .catch((error) => {
    console.error("Error fetching the COVID-19 data:", error);
    // Handle error (if any)
    document.getElementById("total-cases").textContent = "Error loading data";
    document.getElementById("total-deaths").textContent = "Error loading data";
    document.getElementById("total-recovered").textContent =
      "Error loading data";
  });
