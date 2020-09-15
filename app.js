// data from csv file
let data;
let dates = [];
let filteredData;

function handleFileSelect(evt) {
  let input = document.getElementById("csv-file");
  input.style.display = "none";

  let file = evt.target.files[0];

  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function (results) {
      // Limited data to 5000 results which is from January 1, 2017 - July 29, 2017
      data = results.data.slice(0, 5000);
    },
  });
}

let generateDropDown = document.getElementById("generate");
generateDropDown.addEventListener("click", createDropDown);

//   create the drop-down menu for picking the station
function createDropDown() {
  generateDropDown.style.display = "none";

  let values = ["SO2", "NO2", "O3", "CO"];

  let select = document.createElement("select");

  select.addEventListener("click", createChart);

  for (const val of values) {
    let option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }

  let label = document.createElement("label");
  label.innerHTML = "Choose your station: ";
  label.htmlFor = "station";

  document.getElementById("container").appendChild(label).appendChild(select);

  generateDates();
}

function generateDates() {
  let container = document.getElementById("container");
  let date1 = document.createElement("input");
  let date2 = document.createElement("input");
  date1.setAttribute("type", "date");
  date2.setAttribute("type", "date");
  container.appendChild(date1);
  container.appendChild(date2);
  let inputDatesBtn = document.createElement("button");
  inputDatesBtn.setAttribute("type", "button");
  inputDatesBtn.innerHTML = "Submit Date Range";
  container.appendChild(inputDatesBtn);
  inputDatesBtn.addEventListener("click", () => {
    if (dates.length > 0) {
      dates.shift();
      dates.shift();
    }
    dates.push(date1.value);
    dates.push(date2.value);
    filteredData = filterData(data, dates);
  });
}

// create chart based on station selected.
function createChart(e) {
  let val = e.target.value;

  if (val === "SO2") {
    createSO2Chart(data, val);
  } else if (val === "NO2") {
    createNO2Chart(data, val);
  } else if (val === "O3") {
    createO3Chart(data, val);
  } else {
    createCOChart(data, val);
  }
}

// filter data based on the dates selected.
function filterData(data, dates) {
  let filterData = data.filter(function (a) {
    let measurementDate = a["Measurement date"].split(" ")[0];
    let array = [];
    array.push(measurementDate);
    let MDdate = new Date(measurementDate);
    let sDate = new Date(dates[0]);
    let eDate = new Date(dates[1]);

    let dateMatch = array.some(function () {
      return MDdate >= sDate && MDdate <= eDate;
    });
    return dateMatch;
  });
  return filterData;
}

function createSO2Chart(data, val) {
  createLineSeries(data, val);
}

function createNO2Chart(data, val) {
  createLineSeries(data, val);
}

function createO3Chart(data, val) {
  createLineSeries(data, val);
}

function createCOChart(data, val) {
  createLineSeries(data, val);
}

//   Create the line series chart with the data and correct station.
function createLineSeries(data, val) {
  let chartData = [];
  for (let i = 0; i < filteredData.length; i++) {
    let nDate = new Date(
      filteredData[i]["Measurement date"].split(" ")[0] +
        ", " +
        filteredData[i]["Measurement date"].split(" ")[1]
    );
    chartData.push({
      date: nDate,
      value: filteredData[i][val],
    });
  }

  am4core.ready(function () {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = chartData;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";

    series.tooltip.pointerOrientation = "vertical";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();
  });
}

$(document).ready(function () {
  $("#csv-file").change(handleFileSelect);
});
