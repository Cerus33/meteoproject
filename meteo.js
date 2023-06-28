// création fonction pour afficher la date du jour
function afficherDate() {
    let date = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let dateString = date.toLocaleDateString('fr-FR', options);
    document.getElementById('dateJour').innerHTML = dateString;
  }

// Création de la fonction apiCall pour l'appel de l'Api de météo
function apiCall(city) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&lang=fr&appid=ce8326cf2907cde6d9f2db8b5baaa814&units=metric';

    fetch(url).then((response) => response.json().then((data) => {
        console.log(data);
        document.querySelector('#ville').innerHTML = '<i class="fa-solid fa-location-dot"></i> ' + data.name;
        document.querySelector('#temperature').innerHTML = '<i class="fa-solid fa-temperature-half"></i> ' + data.main.temp + '°C';
        document.querySelector('#description').innerHTML = data.weather[0].description;
        document.getElementById('icon').src = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    })
    );
}

// fonction pour récupérer le nom de la ville dans le fichier conf.json et utilisation de la fonction apiCall
function appelConf(){
fetch('./conf.json').then((resp) =>
resp.json().then((data) => 
apiCall(data.ville))
);
}
// Appel de la fonction appConf pour récupére les données ville et méteo pour les traiter
appelConf();

//actualisation toute les heures
setInterval(appelConf, 60000);