// function to create HTML from json data using handlebars
let createHTML = aimtellData => {
  let rawTemplate = 
  `{{#each sites}} 
    <tr>
      <th scope='row'>{{id}}</th>
      <td>{{name}}</td>
      <td>{{url}}</td>
    </tr> 
   {{/each}}`;
  let compileFunction = Handlebars.compile(rawTemplate);
  let compiledHTML = compileFunction(aimtellData);
  let dataContainer = document.querySelector('#table-body');
  dataContainer.innerHTML = compiledHTML;
}

// function to load json data from api
let loadData = () => {
  let requestObject = new XMLHttpRequest();
  requestObject.open('GET', 'https://aimtell.com/files/sites.json');
  requestObject.onload = () => {
    if(requestObject.status >= 200 && requestObject.status < 400) {
      let data = JSON.parse(requestObject.response);
      createHTML(data);
    } else {
      console.log('Connection error');
    }
  };
  
  requestObject.onerror = (error) => {
    console.log(`Error:${error}`)
  }
  
  requestObject.send();
}

let dataLoadButton = document.querySelector('.btn');

dataLoadButton.addEventListener('click', loadData);

// unregister click event listener for button before the page unloads
window.onbeforeunload = () => {
  dataLoadButton.removeEventListener('click', loadData)
}

