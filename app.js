import { movies } from "./movies.js";

function fetchAllMovies(movies) {
    // Récupération de l'élement
    const elApp = document.getElementsByTagName("tbody")[0];
    elApp.innerHTML = "";
  
    let data = "";
    // Récupération des données
   
    movies.forEach((m, index) => {
        data += `
    <tr>
          <td>${m.name}</td>
          <td>${m.wins}</td>
          <td>${m.Loses}</td>
          <td>${m.Scores}</td>
    <td>
          
    <button class="edit btn btn-sm btn-outline-success" value="${index}">
            Modifier
          </button>
          <button class="delete btn btn-sm btn-outline-danger" value="${index}">
            Supprimer
          </button>
    </td>

    </tr>`;
      });
  
    // Affichage des éléments dans le HTML
    if (data.length > 0) {
        // Affichage des données dans le tableau
    elApp.innerHTML += data;

    // Chaque bouton "Editer"
document.querySelectorAll("button.edit").forEach(b => {
    b.addEventListener("click", function() {
      return editMovie(this.value);
    });
  });
// Chaque bouton "Supprimer"
document.querySelectorAll("button.delete").forEach(b => {
    b.addEventListener("click", function() {
      return deleteMovie(this.value);
    });
  });
} else {
    // Aucune donnée
    elApp.innerHTML += "<p>Aucune ligne trouvée</p>";
  }

  } 
  fetchAllMovies(movies);
  
  document.querySelectorAll("input[type=search]")[0]
  .addEventListener("input", search);


  function search() {
    const filteredData = movies.filter(movie =>
      movie.name.toLowerCase().includes(this.value.toLowerCase())
    );
    fetchAllMovies(filteredData);
  }

  const elForm = document.getElementById("form");
  elForm.style.display = "none";
  const elContent = document.getElementById("content");
document.getElementById("form-add").addEventListener("click", function() {
  displayForm();
});

function displayForm() {
    elForm.style.display = "block";
    elContent.style.display = "none";
  }

  document.getElementById("form-save").addEventListener("click", function() {
    // Récupération des champs
    const name = document.getElementById("name").value;
    const wins = document.getElementById("wins").value;
    const loses = document.getElementById("lose").value;
    const scores = document.getElementById("score").value;
  
    if (name && wins && loses && scores) {
      // Nouvelle ligne
      const movie = { name: name, wins: wins , Loses: loses, Scores: scores};
  
      // Ajout de la nouvelle ligne
      if (document.getElementById("hidden").value.length > 0) {
        movies.splice(document.getElementById("hidden").value, 1, movie);
      } else {
        movies.push(movie);
      }
  
      // Affichage du nouveau tableau
      return fetchAllMovies(movies);
    }
  });
  function hideForm() {
    elForm.style.display = "none";
    elContent.style.display = "block";
  
    document.getElementById("name").value = "";
    document.getElementById("wins").value = "";
    document.getElementById("lose").value = "";
    document.getElementById("score").value = "";
    document.getElementById("hidden").value = "";
  }
  document.getElementById("form-cancel").addEventListener("click", function() {
    hideForm();
  });
  function editMovie(index) {
    // Récupération de la ligne via son index
    const movie = movies.find((m ,i) => {
      return i == index;
      
    });
    
    // Alimentation des champs
    document.getElementById("name").value = movie.name;
    document.getElementById("wins").value = movie.Wins;
    document.getElementById("lose").value = movie.Loses;
    document.getElementById("score").value = movie.Scores;
    document.getElementById("hidden").value = index;

    displayForm();
   }


function deleteMovie(index) {
  if (confirm("Confirmez-vous la suppression de ce film ?")) {
    movies.splice(index, 1);
    fetchAllMovies(movies);
  }
}

console.table(movies);