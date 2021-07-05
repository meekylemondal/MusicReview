// NEXT STEPS:
// - HAVE SOME SORT OF INTRO WHEN YOU FIRST GO ONTO THE WEBPAGE?
// - HOW DO YOU WORK WITH WEBHOOKS?
// - ADDING MULTIPLE PAGES MAYBE?
// - MAYBE ADD SINGLE REVIEWS AS WELL?

// ADD SOME BETTER COMMENTS TO THIS FILE! 


// This function gathers the entries from the google sheets file and then passes each row 1 at a time to the createTable function to create a
// table for each album
async function loadData(){
    let data = await drive("1kN1hB10O5LJRSH8xUJv-d9vVK1LMgDPBJW2JQDk5fOg");
    data = data.reverse();

    // Counter of which album it is currently on
    let counter = data.length;

    data.forEach(row =>{
        // Function that will create the table with the actual reviews
        createTable(row, counter);
        // Function here that will create a table of contents of sorts
        createTableOfContents(row, counter);
        counter--;
    })
}

function createTableOfContents(row, albumNumber){
    // Insert the album names into the table of contents 
    let tableOfContentRow = document.createElement("tr");

    // Accessing the table from the webpage
    let table = document.getElementById('table-of-contents');
    
    // Getting the div the table is located within
    let tableDiv = document.getElementById('table-of-contents-div');

    // Getting the body of the webpage 
    let body = document.getElementsByTagName('body')[0];

    // Creating an array of the row, and then accessing the name of the album
    let rowArray = Object.values(row);
    for (let col = 0; col < 1; col++){
        let col1 = document.createElement("td");

        let link = document.createElement('a');
        let message = document.createTextNode(rowArray[1]);
        link.appendChild(message);

        link.href = '#' + rowArray[1];
        link.id = 'tableOfContentsLink';

        let albumNameContents = document.createTextNode(rowArray[1]);

        // Adding the data to the td
        col1.appendChild(link);

        // Adding the td to the tr
        tableOfContentRow.appendChild(col1);


    }


    // Adding the tr to the table 
    table.appendChild(tableOfContentRow);

    // Adding the table to the table div 
    tableDiv.appendChild(table);

    // Adding the table div to the body 
    body.appendChild(tableDiv);

}

// Add an array param (dedicated to each row of the table, that will upload the data)
function createTable(row, albumNumber){
    // Setting up some preliminary variables that will be used in this function
    var body = document.getElementsByTagName('body')[0];
    var table = document.createElement('table');
    table.id = 'review-table';
    var tablebody = document.createElement("tbody");

    // Converting the object to an array for looping purposes
    let array = Object.values(row);

    // Nested for loop that will traverse through each row-column cell in the table, assigning values as they do so
    for (var row = 0; row < 3; row++){
        // Creating the table row
        var tr = document.createElement('tr');
        for (var col = 0; col < 2; col++){
            // Creating the table data
            var td = document.createElement('td');

            // If cases here checking which row and column it is on, and then deciding what content will be in which
            if (row == 0){
                if (col == 0){
                    // Setting the album cover
                    var albumCover = document.createElement("img");
                    let placeholder = document.createElement('p');
                    placeholder.id = array[1];

                    albumCover.src = array[0];
                    albumCover.id = "album-cover";

                    td.appendChild(albumCover);
                    td.appendChild(placeholder);

                    td.setAttribute('rowSpan', '4');
                    td.id = 'album-cover-id';
                    td.style.backgroundColor = array[5];
                } else {
                    // Splitting the artist's name and then joining it in a format that can be used in a link
                    let artistNameDash = array[2].split(" ");
                    let linkName = artistNameDash.join('-');

                    // Splitting the album's name and then joining it in a format that can be used in a link
                    let albumNameDash = array[1].split(" ");
                    let albumLinkName = albumNameDash.join("-");

                    // Creating the link element
                    let link = document.createElement('a');
                    let message = document.createTextNode("Album #" + albumNumber + ": " + array[1]);
                    link.appendChild(message);

                    // Setting the link and then instructing it to open in a new tab on click
                    link.href = 'https://genius.com/albums/' + linkName + '/' + albumLinkName;
                    link.target = '_blank';
                    link.id = 'link';
                    td.appendChild(link);
                    td.setAttribute('colSpan', '2');
                    td.id = "album-title";
                }
            } else if (row == 1){
                if (col == 0){
                    // Setting the artist
                    td.appendChild(document.createTextNode(array[2]));
                    td.id = 'artist-name-id';
                } else {
                    // Setting the rating
                    td.appendChild(document.createTextNode("Rating: " + array[3]));
                    td.id = 'rating-id';

                    // Assigning a specific background colour depending on rating of album
                    let rating = parseFloat(array[3]);
                    if (rating == 0){
                        td.style.backgroundColor = '#FF0000';
                    } else if (rating > 0 && rating <= 1){
                        td.style.backgroundColor = '#FF3300';
                    } else if (rating > 1 && rating <= 2){
                        td.style.backgroundColor = '#FF6600';
                    } else if (rating > 2 && rating <= 3){
                        td.style.backgroundColor = '#FF9900';
                    } else if (rating > 3 && rating <= 4){
                        td.style.backgroundColor = '#FFCC00';
                    } else if (rating > 4 && rating <= 5){
                        td.style.backgroundColor = '#FFFF00';
                    } else if (rating > 5 && rating <= 6){
                        td.style.backgroundColor = '#CCFF00';
                    } else if (rating > 6 && rating <= 7){
                        td.style.backgroundColor = '#99FF00';
                    } else if (rating > 7 && rating <= 8){
                        td.style.backgroundColor = '#66FF00';
                    } else if (rating > 8 && rating <= 9){
                        td.style.backgroundColor = '#33FF00';
                    } else {
                        td.style.backgroundColor = '#00FF00';
                    }
                }

            } else {
                if (col == 0){
                    // Setting the thoughts
                    td.appendChild(document.createTextNode(array[4]));
                    td.setAttribute('colSpan', '2');
                    td.id = 'thoughts';
                }
            }

            // Adding the content to the table row
            tr.appendChild(td);

            // Breaking out of the loop
            if (row == 2 && col == 0){
                break;
            }
        }

        // Adding the table row to the table body
        tablebody.appendChild(tr);

    }

    // Adding the table body to the table
    table.appendChild(tablebody);

    var divTest = document.getElementById('review-table-div');
    divTest.appendChild(table);
    // Adding the table to the body
    body.appendChild(divTest);

}
