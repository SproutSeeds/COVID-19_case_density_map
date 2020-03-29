function fetchData() {
  fetch('https://cors-anywhere.herokuapp.com/http://ncov2019.live/data')
    .then(function(response) {
      return response.text();
    })
    .then(function(html) {
      let parser = new DOMParser();

      //DOM Element Selection
      let document = parser.parseFromString(html, 'text/html');
      let usa_container = document.getElementById('container_USA');
      let usa_sortable_table = document.getElementById('sortable_table_USA');
      let usa_table_HEADER = usa_sortable_table.querySelector('thead');
      let usa_table_BODY = usa_sortable_table.querySelector('tbody');
      // HEADER elements
      let usa_header_th = usa_table_HEADER.querySelectorAll('th');
      // BODY elements
      let usa_body_tr = usa_table_BODY.querySelectorAll('tr');

      // Clean Arrays
      let headerArray = returnCleanHeader(usa_header_th);

      // Clean Body Object
      return returnCleanBody(headerArray, usa_body_tr);
    })
    .then(function(usa_body_obj) {
      // let usa_body_csv = makeCSV(usa_body_obj);

      let usa_total = usa_body_obj.states.shift();

      // return usa_body_obj.states;
      main(usa_body_obj.states);
    });
}
function returnCleanHeader(nodeList) {
  let cleanHeaderArray = [];
  nodeList.forEach(function(item, index) {
    cleanHeaderArray.push(item.innerText);
  });
  return cleanHeaderArray;
}
function returnCleanBody(headerArray, usa_body_list) {
  let bodyObj = {
    states: []
  };

  usa_body_list.forEach((item, index) => {
    bodyObj.states.push({
      state_name: item.children[0].innerText
        .replace(/\s/g, '')
        .replace(/★/i, ''),
      confirmed_cases: item.children[1].innerText
        .replace(/\s/g, '')
        .replace(/,/g, ''),
      number_of_new_cases_today: item.children[2].innerText
        .replace(/\s/g, '')
        .replace(/,/g, ''),
      percent_change_new_cases: item.children[3].innerText
        .replace(/\s/g, '')
        .replace(/,/g, ''),
      number_of_deceased: item.children[4].innerText
        .replace(/\s/g, '')
        .replace(/,/g, ''),
      number_of_new_deceased_today: item.children[5].innerText
        .replace(/\s/g, '')
        .replace(/,/g, ''),
      percent_change_new_deceased: item.children[6].innerText
        .replace(/\s/g, '')
        .replace(/,/g, ''),
      number_recovered: item.children[7].innerText
        .replace(/\s/g, '')
        .replace(/,/g, ''),
      number_serious_conditions: item.children[8].innerText
        .replace(/\s/g, '')
        .replace(/,/g, '')
    });
  });

  let clean_states = bodyObj.states.filter(
    state => state.state_name !== 'DistrictofColumbia'
  );
  clean_states = clean_states.filter(
    state => state.state_name !== 'PuertoRico'
  );
  clean_states = clean_states.filter(
    state => state.state_name !== 'DiamondPrincess(repatriated)'
  );
  clean_states = clean_states.filter(state => state.state_name !== 'Guam');
  clean_states = clean_states.filter(
    state => state.state_name !== 'GrandPrincess'
  );
  clean_states = clean_states.filter(
    state => state.state_name !== 'U.S.VirginIslands'
  );
  clean_states = clean_states.filter(
    state => state.state_name !== 'Wuhan(repatriated)'
  );
  clean_states = clean_states.filter(
    state => state.state_name !== 'AmericanSamoa'
  );
  clean_states = clean_states.filter(
    state => state.state_name !== 'NorthernMarianaIslands'
  );

  clean_states = addAbbreviationAsProperty(clean_states);

  bodyObj = {
    states: clean_states
  };

  return bodyObj;
}
function addAbbreviationAsProperty(clean_states) {
  let state_abbrev = [
    { name: 'Alabama', abbrev: 'AL', population: 5081440 },
    { name: 'Alaska', abbrev: 'AK', population: 731550 },
    { name: 'Arizona', abbrev: 'AZ', population: 7280000 },
    { name: 'Arkansas', abbrev: 'AR', population: 3020000 },
    { name: 'California', abbrev: 'CA', population: 40000000 },
    { name: 'Colorado', abbrev: 'CO', population: 5760000 },
    { name: 'Connecticut', abbrev: 'CT', population: 3565287 },
    { name: 'Delaware', abbrev: 'DE', population: 976972 },
    { name: 'Florida', abbrev: 'FL', population: 21480000 },
    { name: 'Georgia', abbrev: 'GA', population: 10617423 },
    { name: 'Hawaii', abbrev: 'HI', population: 1420000 },
    { name: 'Idaho', abbrev: 'ID', population: 1790000 },
    { name: 'Illinois', abbrev: 'IL', population: 12670000 },
    { name: 'Indiana', abbrev: 'IN', population: 6679200 },
    { name: 'Iowa', abbrev: 'IA', population: 3155070 },
    { name: 'Kansas', abbrev: 'KS', population: 2934240 },
    { name: 'Kentucky', abbrev: 'KY', population: 4470000 },
    { name: 'Louisiana', abbrev: 'LA', population: 4650000 },
    { name: 'Maine', abbrev: 'ME', population: 1340000 },
    { name: 'Maryland', abbrev: 'MD', population: 6050000 },
    { name: 'Massachusetts', abbrev: 'MA', population: 6892503 },
    { name: 'Michigan', abbrev: 'MI', population: 9986857 },
    { name: 'Minnesota', abbrev: 'MN', population: 5600000 },
    { name: 'Mississippi', abbrev: 'MS', population: 2980000 },
    { name: 'Missouri', abbrev: 'MO', population: 6140000 },
    { name: 'Montana', abbrev: 'MT', population: 1068778 },
    { name: 'Nebraska', abbrev: 'NE', population: 1925840 },
    { name: 'Nevada', abbrev: 'NV', population: 3034400 },
    { name: 'NewHampshire', abbrev: 'NH', population: 1360000 },
    { name: 'NewJersey', abbrev: 'NJ', population: 8880000 },
    { name: 'NewMexico', abbrev: 'NM', population: 2096829 },
    { name: 'NewYork', abbrev: 'NY', population: 19500000 },
    { name: 'NorthCarolina', abbrev: 'NC', population: 10490000 },
    { name: 'NorthDakota', abbrev: 'ND', population: 762062 },
    { name: 'Ohio', abbrev: 'OH', population: 11690000 },
    { name: 'Oklahoma', abbrev: 'OK', population: 3978480 },
    { name: 'Oregon', abbrev: 'OR', population: 4236400 },
    { name: 'Pennsylvania', abbrev: 'PA', population: 12801989 },
    { name: 'RhodeIsland', abbrev: 'RI', population: 1060000 },
    { name: 'SouthCarolina', abbrev: 'SC', population: 5150000 },
    { name: 'SouthDakota', abbrev: 'SD', population: 880000 },
    { name: 'Tennessee', abbrev: 'TN', population: 6795240 },
    { name: 'Texas', abbrev: 'TX', population: 29440000 },
    { name: 'Utah', abbrev: 'UT', population: 3210000 },
    { name: 'Vermont', abbrev: 'VT', population: 623989 },
    { name: 'Virginia', abbrev: 'VA', population: 8540000 },
    { name: 'Washington', abbrev: 'WA', population: 7546400 },
    { name: 'WestVirginia', abbrev: 'WV', population: 1792147 },
    { name: 'Wisconsin', abbrev: 'WI', population: 5820000 },
    { name: 'Wyoming', abbrev: 'WY', population: 578880 }
  ];

  clean_states.forEach(function(state, index) {
    state_abbrev.forEach(function(state_abbrev, index) {
      if (state.state_name === state_abbrev.name) {
        let percent_of_pop_effected = calculate_percent_of_pop_effected(
          state,
          state_abbrev
        );
        state.state_abbreviation = state_abbrev.abbrev;
        state.population = state_abbrev.population;
        state.percent_of_pop_effected = percent_of_pop_effected;
      }
    });
  });
  return clean_states;
}
function makeCSV(bodyObj) {
  let usa_body_csv_string = 'state,num_of_cases';
  bodyObj.states.forEach(function(state, index) {
    if (state.state_abbreviation !== undefined) {
      usa_body_csv_string += `\n${state.state_abbreviation},${state.confirmed_cases}`;
    }
  });
  return usa_body_csv_string;
}
function calculate_percent_of_pop_effected(state, state_abbrev) {
  let percent_of_pop_effected =
    (state.confirmed_cases / state_abbrev.population) * 100;
  return percent_of_pop_effected;
}

// function fetch_count_check_decrement() {
//   localStorage.removeItem('states_data');
//   let states_data = localStorage.getItem('states_data');

//   if (states_data === 'undefined' || states_data === null) {
//     console.log('we made it to first if block');

//     localStorage.setItem('time_of_fetch', JSON.stringify(Date.now()));
//     let time_of_fetch = localStorage.getItem('time_of_fetch');

//     localStorage.setItem('states_data', JSON.stringify(fetchData()));
//     let states_data = localStorage.getItem('states_data');

//     console.log(states_data);
//     console.log(time_of_fetch);

//     main(states_data);
//   } else if (
//     states_data !== 'undefined' &&
//     Date.now() - localStorage.getItem('time_of_fetch') > 60000
//   ) {
//     console.log('we made it to else if block');

//     localStorage.setItem('states_data', JSON.stringify(fetchData()));
//     states_data = localStorage.getItem('states_data');
//     console.log(states_data);
//     main(states_data);
//   } else {
//     console.log('we made it to else block');
//     console.log(states_data);

//     main(states_data);
//   }
// }

// fetch_count_check_decrement();

fetchData();
