// let data_button = document.getElementById('pull_data');

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

      // return usa_body_obj;
      let usa_total = usa_body_obj.states.shift();
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
    { name: 'Alabama', abbrev: 'AL' },
    { name: 'Alaska', abbrev: 'AK' },
    { name: 'Arizona', abbrev: 'AZ' },
    { name: 'Arkansas', abbrev: 'AR' },
    { name: 'California', abbrev: 'CA' },
    { name: 'Colorado', abbrev: 'CO' },
    { name: 'Connecticut', abbrev: 'CT' },
    { name: 'Delaware', abbrev: 'DE' },
    { name: 'Florida', abbrev: 'FL' },
    { name: 'Georgia', abbrev: 'GA' },
    { name: 'Hawaii', abbrev: 'HI' },
    { name: 'Idaho', abbrev: 'ID' },
    { name: 'Illinois', abbrev: 'IL' },
    { name: 'Indiana', abbrev: 'IN' },
    { name: 'Iowa', abbrev: 'IA' },
    { name: 'Kansas', abbrev: 'KS' },
    { name: 'Kentucky', abbrev: 'KY' },
    { name: 'Louisiana', abbrev: 'LA' },
    { name: 'Maine', abbrev: 'ME' },
    { name: 'Maryland', abbrev: 'MD' },
    { name: 'Massachusetts', abbrev: 'MA' },
    { name: 'Michigan', abbrev: 'MI' },
    { name: 'Minnesota', abbrev: 'MN' },
    { name: 'Mississippi', abbrev: 'MS' },
    { name: 'Missouri', abbrev: 'MO' },
    { name: 'Montana', abbrev: 'MT' },
    { name: 'Nebraska', abbrev: 'NE' },
    { name: 'Nevada', abbrev: 'NV' },
    { name: 'NewHampshire', abbrev: 'NH' },
    { name: 'NewJersey', abbrev: 'NJ' },
    { name: 'NewMexico', abbrev: 'NM' },
    { name: 'NewYork', abbrev: 'NY' },
    { name: 'NorthCarolina', abbrev: 'NC' },
    { name: 'NorthDakota', abbrev: 'ND' },
    { name: 'Ohio', abbrev: 'OH' },
    { name: 'Oklahoma', abbrev: 'OK' },
    { name: 'Oregon', abbrev: 'OR' },
    { name: 'Pennsylvania', abbrev: 'PA' },
    { name: 'RhodeIsland', abbrev: 'RI' },
    { name: 'SouthCarolina', abbrev: 'SC' },
    { name: 'SouthDakota', abbrev: 'SD' },
    { name: 'Tennessee', abbrev: 'TN' },
    { name: 'Texas', abbrev: 'TX' },
    { name: 'Utah', abbrev: 'UT' },
    { name: 'Vermont', abbrev: 'VT' },
    { name: 'Virginia', abbrev: 'VA' },
    { name: 'Washington', abbrev: 'WA' },
    { name: 'WestVirginia', abbrev: 'WV' },
    { name: 'Wisconsin', abbrev: 'WI' },
    { name: 'Wyoming', abbrev: 'WY' }
  ];

  clean_states.forEach(function(state, index) {
    state_abbrev.forEach(function(state_abbrev, index) {
      if (state.state_name === state_abbrev.name) {
        state.state_abbreviation = state_abbrev.abbrev;
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

// data_button.addEventListener('click', fetchData);

fetchData();
