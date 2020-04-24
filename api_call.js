
function api()
{
    var row_limit = 0;    //variable for keeping count of cards in one row                                                                                                    
    var row_no = 1;       //variable for keeping track of row number
    var new_row = 'resultDiv';  //current row element id
    for (i = 0; i < 12; i++) {      
        fetch("https://mlemapi.p.rapidapi.com/randommlem", {                                    //api url to fetch data (this api returns one data element per request in json format)
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "mlemapi.p.rapidapi.com",
            "x-rapidapi-key": "b19549ae55mshf52e37ba3683653p1a3e4ejsn0b2e39cd1369"              //sending authenticaiton key with request (provided by the host website)
        }
        })
        .then(function (a) {
            return a.json();        // call the json method on the response to get JSON
        })
        .then(function (json) {
            if (row_limit > 2)      //if the number of cards in current row element is more than 3 create new row
            {   
                new_row = 'resultDiv'+(row_no/3).toFixed(0);        //dynamically generating name for new row
                var p = document.getElementById('main_div');        //getting outer div element in which we will we creating new row dynamically
                var newElement = document.createElement('div');     //creating new element of div type
                newElement.setAttribute('id', new_row);             //setting new div element id to new_row
                newElement.setAttribute('class',"row top-buffer");  //setting attribute for new div element
                p.appendChild(newElement);                          //appending new div to outer div
                row_limit = 0;                                      //reseting row_limit variable
            }
            
            var card_html = `<div class="card" style="width: 18rem; height:25rem; overflow:hidden;">                        
            <img src="`+json['url']+`" class="card-img-top" style="width: 18rem; height:20rem;" alt="Animal Image">
            <div class="card-body">
              <h4 class="card-text">`+json['tags']+`</h4>
            </div>
          </div>`;                                                  //html for creating new card                                              

            var p = document.getElementById(new_row);               //getting outer element
            var newElement = document.createElement('div');         //creating new div element
            newElement.setAttribute('id', 'childdiv'+row_no);       //setting new div element id
            newElement.setAttribute('class',"col-sm");              //setting new div element attribute
            newElement.innerHTML = card_html;                       //creating a new card element inside new div element
            p.appendChild(newElement);                              //appeing new div element to outer div element
            console.log(json);                                      //printing json data to console    
            row_limit++;                                            //incrementing row_limit by 1
            row_no++;                                               //incremeting row_no by 1
            
        })
         
    }
    
    
}

api();                                                               //function calling