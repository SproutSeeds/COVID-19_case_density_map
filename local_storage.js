function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 1500);
  });
}

async function asyncCall() {
  let state_data = JSON.parse(localStorage.getItem("state_data"));
  let time = localStorage.getItem("time");

  if (state_data === null) {
    fetchData();
    await resolveAfter2Seconds();
    let state_data = JSON.parse(localStorage.getItem("state_data"));
    console.log("new fetch FIRST TIME");
    console.log(state_data);

    map_main(state_data);
  } else {
    let time = parseInt(localStorage.getItem("time"));

    if (Date.now() - time > 1800000) {
      fetchData();
      await resolveAfter2Seconds();
      let state_data = JSON.parse(localStorage.getItem("state_data"));
      console.log("new fetch, waited 30mins");
      console.log(
        (1800000 - (Date.now() - time)) / 1000,
        "seconds til new data"
      );
      console.log(state_data);

      map_main(state_data);
    } else {
      let state_data = JSON.parse(localStorage.getItem("state_data"));
      console.log("pulling local data");
      console.log(
        (1800000 - (Date.now() - time)) / 1000,
        "seconds til new data"
      );

      console.log(state_data);
      map_main(state_data);
    }
  }

  await resolveAfter2Seconds();
}

asyncCall();
