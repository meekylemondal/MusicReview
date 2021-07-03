// This function gathers the entries from the google sheets file and then passes each row 1 at a time to the createTable function to create a 
// table for each album
async function loadData(){
    let data = await drive("1kN1hB10O5LJRSH8xUJv-d9vVK1LMgDPBJW2JQDk5fOg");

    data.forEach(row =>{
        createTable(row);
    })
}
// Add an array param (dedicated to each row of the table, that will upload the data)
function createTable(row){
    // Setting up some preliminary variables that will be used in this function
    var body = document.getElementsByTagName('body')[0];
    var table = document.createElement('table');
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
                    albumCover.src = array[0];
                    albumCover.id = "album-cover";
                    td.appendChild(albumCover);
                    td.setAttribute('rowSpan', '4');
                } else {
                    td.appendChild(document.createTextNode(array[1]));
                    td.setAttribute('colSpan', '2');
                    td.id = "album-title";
                }
            } else if (row == 1){
                if (col == 0){
                    td.appendChild(document.createTextNode(array[2]));
                } else {
                    td.appendChild(document.createTextNode(array[3]));
                }

            } else {
                if (col == 0){
                    td.appendChild(document.createTextNode(array[4]));
                    td.setAttribute('colSpan', '2');
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

    // Adding the table to the body 
    body.appendChild(table);
    
} 
