(function(document, DOM) {

  var $tableBody = new DOM('[data-js="table-body"]');

  function get(url) {
    return new Promise((resolve, reject) => {

      var ajax = new XMLHttpRequest();
      ajax.open('GET', url);

      ajax.onload = function() {

        if (ajax.status == 200) {
          var returnData = JSON.parse(ajax.response);
          resolve(returnData);
        } else
          reject(Error(ajax.responseText));
      }

      ajax.onerror = function() {
        reject(Error('Network Error'));
      }

      ajax.send();
    });
  }

  function createTableData(data) {
    let tr = document.createElement('td');
    tr.innerText = data;

    return tr;
  }

  function buildTable() {
    let dataURL = 'http://localhost:3000/cars?fullDetails=true';

    get(dataURL).then(data => {

      let fragment = document.createDocumentFragment();

      console.log(data);

      data.forEach(item => {

        let tableRow = document.createElement('tr');
        let id = createTableData(item.id);
        tableRow.appendChild(id);
        let brand = createTableData(item.brand);
        tableRow.appendChild(brand);
        let model = createTableData(item.model);
        tableRow.appendChild(model);
        let version = createTableData(item.version);
        tableRow.appendChild(version);
        let year = createTableData(item.year);
        tableRow.appendChild(year);
        let color = createTableData(item.color);
        tableRow.appendChild(color);
        let mileage = createTableData(item.mileage);
        tableRow.appendChild(mileage);

        let tdImage = document.createElement('td');
        let imageTag = document.createElement('img');
        imageTag.setAttribute('src', item.image_url);
        tdImage.appendChild(imageTag);

        tableRow.appendChild(tdImage);
        fragment.appendChild(tableRow);
      });

      $tableBody.getFirst().appendChild(fragment);
    }).catch(error => {
      console.log(error);
    });
  }

  buildTable();

})(document, DOM);
