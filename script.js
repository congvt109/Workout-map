'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
  constructor() {}

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(this._loadMap(), function () {
        alert('Could not get your position');
      });
  }

  _loadMap(position) {
    console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(
      `https://www.google.com/maps/@${latitude},${longitude},15z?hl=vi`
    );
    const coords = [latitude, longitude];
    map = L.map('map').setView(coords, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('click', function (mapE) {
      mapEvent = mapE; // gán lại một biết global để dùng cho hàm submit form
      form.classList.remove('hidden');
      inputDistance.focus(); // đặt con trỏ soạn thảo sào ô distances sẵn sàng nhập
    });
  }

  _showFrom() {}

  _toggleElevationField() {}

  _newWorkout() {}
}

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(
        `https://www.google.com/maps/@${latitude},${longitude},15z?hl=vi`
      );
      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 15);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', function (mapE) {
        mapEvent = mapE; // gán lại một biết global để dùng cho hàm submit form
        form.classList.remove('hidden');
        inputDistance.focus(); // đặt con trỏ soạn thảo sào ô distances sẵn sàng nhập
        const latitude = mapE.latlng.lat;
        const longitude = mapE.latlng.lng;

        // Log the latitude and longitude to the console
        console.log(
          `currentLatitude: ${latitude}, currentLongitude: ${longitude}`
        );
      });
    },
    function () {
      alert('Could not get your position');
    }
  );

form.addEventListener('submit', function (e) {
  e.preventDefault(); //tránh default behavior của form là load lại trang, làm mất marker

  //Clear input fields
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      '';

  //Display marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWith: 250,
        minWith: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('workout')
    .openPopup();
});

//change running -> cycling
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); //truy xuất closet ngược lại cha của nó, element có class form__row
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});

//  end at 1h38p
