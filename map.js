function map_main(data) {
  const map = new Datamap({
    scope: "usa",
    element: document.getElementById("mapContainer"),
    responsive: true,
    geographyConfig: {
      highlightOnHover: true,
      popupTemplate: function(geo) {
        function findState(provence_state) {
          return provence_state.state_abbreviation === geo.id;
        }
        return [
          '<div class="hoverinfo"><strong>',
          "<h2>" + geo.properties.name + "</h2>",
          '<p id="case-title">COVID-19 Cases:</p>' +
            '<p id="case-number">' +
            data.find(findState).confirmed_cases +
            "</p>" +
            '<p id="percent-title">% of State Population: ' +
            '<p id="percent-number">' +
            data.find(findState).percent_of_pop_effected.toFixed(3) +
            "%" +
            "</p>" +
            "</p>",
          "</strong></div>"
        ].join("");
      }
    }
  });

  // color list
  const under300 = "#FFE5E5",
    between_300_400 = "#FFCCCC",
    between_400_500 = "#FFB2B2",
    between_500_600 = "#FF7F7F",
    between_600_700 = "#FF6565",
    between_700_800 = "#FF4C4C",
    over_800 = "#FF3232";

  for (const state_provence of data) {
    let st = d3.select("." + state_provence.state_abbreviation);

    if (state_provence.percent_of_pop_effected < 0.01) {
      st.style("fill", under300);
    } else if (
      state_provence.percent_of_pop_effected >= 0.01 &&
      state_provence.percent_of_pop_effected < 0.03
    ) {
      st.style("fill", between_300_400);
    } else if (
      state_provence.percent_of_pop_effected >= 0.03 &&
      state_provence.percent_of_pop_effected < 0.05
    ) {
      st.style("fill", between_400_500);
    } else if (
      state_provence.percent_of_pop_effected >= 0.05 &&
      state_provence.percent_of_pop_effected < 0.08
    ) {
      st.style("fill", between_500_600);
    } else if (
      state_provence.percent_of_pop_effected >= 0.08 &&
      state_provence.percent_of_pop_effected < 0.11
    ) {
      st.style("fill", between_600_700);
    } else if (
      state_provence.percent_of_pop_effected >= 0.11 &&
      state_provence.percent_of_pop_effected < 0.2
    ) {
      st.style("fill", between_700_800);
    } else {
      st.style("fill", over_800);
    }
  }

  d3.select(window).on("resize", function() {
    map.resize();
  });
}
