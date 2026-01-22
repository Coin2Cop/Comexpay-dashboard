axios.get("https://api.comexpay.co/api/v1/comexpayRoutes/estadisCont", {
  withCredentials: true
})
.then(function(res) {
  // Se asume que la respuesta tiene la estructura:
  // { labels: ["March 2023", "April 2023", ...], counts: [12, 20, ...] }
  const labels = res.data.labels;
  const counts = res.data.counts;
  
  console.log("Labels:", labels);
  console.log("Counts:", counts);
  
  // Paleta de colores moderna para cada barra
  const colors = ['#FF4560', '#008FFB', '#00E396', '#FEB019', '#775DD0', '#3F51B5'];
  
  // Opciones para el gráfico de barras (diseño minimalista)
  const options = {
    chart: {
      type: 'bar',
      height: 400,
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    series: [{
      name: 'Users Registered',
      data: counts
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        distributed: true, // Asigna un color diferente a cada barra
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: labels,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    grid: {
      show: false
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val;
        }
      }
    },
    legend: {
      show: false
    },
    colors: colors
  };
  
  // Asignamos la instancia globalmente para poder acceder a sus métodos, como dataURI()
  window.apexChart3 = new ApexCharts(document.querySelector("#chart3"), options);
  window.apexChart3.render();
})
.catch(function(err) {
  console.error("Error:", err);
});