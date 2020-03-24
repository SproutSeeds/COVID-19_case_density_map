d3.csv(
  'sample.csv',
  function(d) {
    console.log(d);
    return {
      provence_state: d.provence_state,
      cases: d.number_of_cases
    };
  },
  function(data) {
    d3.select('body').style('background-color', 'black');

    const map = new Datamap({
      scope: 'usa',
      element: document.getElementById('mapContainer'),
      responsive: true,
      geographyConfig: {
        highlightOnHover: true,
        popupTemplate: function(geo) {
          function findState(provence_state) {
            return provence_state.provence_state === geo.id;
          }
          return [
            '<div class="hoverinfo"><strong>',
            geo.properties.name,
            ': ' +
              '<p style="color:red">' +
              data.find(findState).cases +
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

    // Loop Through each state and find correct color
    for (var i = 0; data.length; i++) {
      //   console.log(data[i].cases > 1000);
      let st = d3.select('.' + data[i].provence_state);

      if (data[i].cases < 300) {
        st.style('fill', under300);
      } else if (data[i].cases >= 300 && data[i].cases < 500) {
        st.style('fill', between_300_400);
      } else if (data[i].cases >= 500 && data[i].cases < 700) {
        st.style('fill', between_400_500);
      } else if (data[i].cases >= 700 && data[i].cases < 900) {
        st.style('fill', between_500_600);
      } else if (data[i].cases >= 900 && data[i].cases < 1100) {
        st.style('fill', between_600_700);
      } else if (data[i].cases >= 1100 && data[i].cases < 2000) {
        st.style('fill', between_700_800);
      } else {
        st.style('fill', over_800);
      }
    }

    d3.select(window).on('resize', function() {
      map.resize();
    });
  }
);
