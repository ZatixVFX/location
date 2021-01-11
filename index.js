const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showPosition,
      // if user denies access to there location. It runs this function
      function (err) {
        console.log(`Error ${err.code}: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
      }
    );
  } else {
    console.log("geolocation is not supported");
  }
};

const showPosition = (position) => {
  console.log(position.coords.latitude, position.coords.longitude);
  fetch(
    // enter your access_key in api url
    `https://us1.locationiq.com/v1/reverse.php?key=pk.b34c03954819f800fa527869dc9fa672&format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=17`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let display_location = document.getElementById("location");
      display_location.innerText = data.display_name;
      /*
      let addresses = [];
      data.data.map((location) => {
        console.log(location.label);
        for (x = 310; x <= 370; x++) {
          if (
            // if the addresses that is given includes one of these addresses
            location.label.includes(
              `${x} Imam Haron Road, Cape Town, South Africa`
            ) == true
          ) {
            addresses.push(location.label);
          }
        }
      });
      // if the length of given address is equal to 6 or less
      if (addresses.length >= 6) {
        display_location.innerText = "LifeChoices Office";
      } else {
        display_location.innerText = "Not in LifeChoices Office";
      }
      */
    });
};

getLocation();
