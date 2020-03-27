let data_button = document.getElementById('pull_data');

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
    .then(function(usa) {
      console.log(usa);
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
  return bodyObj;
}

data_button.addEventListener('click', fetchData);
