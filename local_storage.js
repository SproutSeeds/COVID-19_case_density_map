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
    await resolveAfter2Seconds();
    console.log("new fetch FIRST TIME");
    // console.log(state_data);

    map_main(state_data);
  } else {
    let time = parseInt(localStorage.getItem("time"));

    await resolveAfter2Seconds();
    console.log(Date.now() - time);

    if (Date.now() - time > 180000) {
      fetchData();
      await resolveAfter2Seconds();
      let state_data = JSON.parse(localStorage.getItem("state_data"));
      //   localStorage.setItem("time", Date.now());
      console.log(Date.now() - time);
      console.log("new fetch, waited 3 minutes");

      map_main(state_data);
    } else {
      let state_data = JSON.parse(localStorage.getItem("state_data"));
      map_main(state_data);

      let time = parseInt(localStorage.getItem("time"));
      console.log("pulling local data");
      console.log(
        (180000 - (Date.now() - time)) / 1000,
        "seconds til new data"
      );
    }
  }
}

asyncCall();
