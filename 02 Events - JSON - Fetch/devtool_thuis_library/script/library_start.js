'use strict'

/* STAP 2*/
const laadBoeken = function() {
  fetch('http://openlibrary.org/search.json?q=keuken')
      .then(function(response) {
          if (!response.ok) {
              throw Error(
                  `Looks like there was a problem. Status Code: ${response.status}`
              );
          } else {
              return response.json();
          }
      })
      .then(function(jsonObject) {
          verwerkboeken(jsonObject);
      })
      .catch(function(error) {
          console.error(`fout bij verwerken json ${error}`);
      });
};

/* STAP 3*/
const verwerkboeken = function(jsonObject) {
    console.log(`Aantal gevonden boeken: ${jsonObject.numFound}`);
    const arrBoeken = jsonObject.docs;
    for(let boek of arrBoeken) {
        console.log(`Titel en ondertitel ${boek.title_suggest}`);

        if (boek.author_name) {
            const authors = boek.author_name;
            let authorText = `Gescheven door ${authors[0]}`
            for (let i = 1; i < authors.length -1; i++) {
                authorText += `, ${authors[i]}`;
            }
            console.log(authorText);
        }
        else {
            console.log("Geschreven door ???")
        }
        
        
        console.log('Boek gaat over');
        if (boek.subject) {
            for (let subject of boek.subject) {
                console.log(`-> ${subject}`)
            }
        }
        else {
            console.log("--- GEEN ONDERWERPEN BESCHIKBAAR ---")
        }
        console.log("**********");        
    }
}

/* STAP 1 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Geladen');
    laadBoeken();
})