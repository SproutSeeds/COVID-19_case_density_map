function main(data) {
  console.log(data);
  const map = new Datamap({
    scope: 'usa',
    element: document.getElementById('mapContainer'),
    responsive: true,
    geographyConfig: {
      highlightOnHover: true,
      popupTemplate: function(geo) {
        function findState(provence_state) {
          return provence_state.state_abbreviation === geo.id;
        }
        return [
          '<div class="hoverinfo"><strong>',
          geo.properties.name,
          ': ' +
            '<p style="color:red">' +
            data.find(findState).confirmed_cases +
            '</p>' +
            ' COVID-19 Cases',
          '</strong></div>'
        ].join('');
      }
    }
  });

  // color list
  const under300 = '#97ED8A',
    between_300_400 = '#8FE039',
    between_400_500 = '#45BF55',
    between_500_600 = '#1F9C10',
    between_600_700 = '#167F39',
    between_700_800 = '#044C29',
    over_800 = '#00261C';

  for (const state_provence of data) {
    let st = d3.select('.' + state_provence.state_abbreviation);

    if (state_provence.confirmed_cases < 300) {
      st.style('fill', under300);
    } else if (
      state_provence.confirmed_cases >= 300 &&
      state_provence.confirmed_cases < 500
    ) {
      st.style('fill', between_300_400);
    } else if (
      state_provence.confirmed_cases >= 500 &&
      state_provence.confirmed_cases < 700
    ) {
      st.style('fill', between_400_500);
    } else if (
      state_provence.confirmed_cases >= 700 &&
      state_provence.confirmed_cases < 900
    ) {
      st.style('fill', between_500_600);
    } else if (
      state_provence.confirmed_cases >= 900 &&
      state_provence.confirmed_cases < 1100
    ) {
      st.style('fill', between_600_700);
    } else if (
      state_provence.confirmed_cases >= 1100 &&
      state_provence.confirmed_cases < 2000
    ) {
      st.style('fill', between_700_800);
    } else {
      st.style('fill', over_800);
    }
  }

  d3.select(window).on('resize', function() {
    map.resize();
  });
}
