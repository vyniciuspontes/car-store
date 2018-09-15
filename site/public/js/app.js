(function(document, DOM) {

  var app = (function(document, DOM) {

    var $tableBody = new DOM('[data-js="table-body"]');
    var $brandSelect = new DOM('[data-js="brand-select"]');
    var $modelSelect = new DOM('[data-js="model-select"]');
    var $versionSelect = new DOM('[data-js="version-select"]');

    var $carForm = new DOM('[data-js="car-form"]');


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

    function post(url, formData) {
      return new Promise((resolve, reject) => {

        var ajax = new XMLHttpRequest();
        ajax.open('POST', url, true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        ajax.onload = function() {

          if (ajax.status == 201) {
            var returnData = ajax.responseText;
            resolve(returnData);
          } else
            reject(Error(ajax.responseText));
        }

        ajax.onerror = function() {
          reject(Error('Network Error'));
        }

        ajax.send(formData);
      });
    }

    function createElementWithContent(tag, content, value) {
      let element = document.createElement(tag);
      element.textContent = content;
      if(value)
        element.value = value;
      return element;
    }

    function fillSelect(dataURL, element) {

      DOM.clearChildNodes(element);

      let fragment = document.createDocumentFragment();

      return new Promise(resolve => { get(dataURL).then(data =>
        {
            data.forEach(item => {
              let option = createElementWithContent('option', item.name, item.id);
              fragment.appendChild(option);
            });

            element.appendChild(fragment);
            resolve();
        });
      });
    }

    function buildFormData() {
      let brandsURL = 'http://localhost:3000/brands/';
      let modelsURL = 'http://localhost:3000/models/'

      $brandSelect.getFirst().onchange = function() {
        let brandModelsURL = brandsURL + $brandSelect.getFirst().value + '/models';
        fillSelect(brandModelsURL, $modelSelect.getFirst()).then(() => {
            let versionsURL = modelsURL + $modelSelect.getFirst().value + '/versions';
            console.log(versionsURL);
            fillSelect(versionsURL, $versionSelect.getFirst());
          }
        );
      };

      $modelSelect.getFirst().onchange = function() {
        let modelVersionsURL = modelsURL + $modelSelect.getFirst().value + '/versions';
        fillSelect(modelVersionsURL, $versionSelect.getFirst());
      };

      fillSelect(brandsURL, $brandSelect.getFirst()).then(() => {
          let brandModelsURL = brandsURL + $brandSelect.getFirst().value + '/models';
          fillSelect(brandModelsURL, $modelSelect.getFirst()).then( () => {
              let modelVersionssURL = modelsURL + $modelSelect.getFirst().value + '/versions';
              fillSelect(modelVersionssURL, $versionSelect.getFirst());
            }
          );
        }
      );
    }

    function loadTable() {
      let dataURL = 'http://localhost:3000/cars?fullDetails=true';

      get(dataURL).then(data => {

        DOM.clearChildNodes($tableBody.getFirst());
        let fragment = document.createDocumentFragment();

        data.forEach((item, index) => {

          let tableRow = document.createElement('tr');
          let id = createElementWithContent('td', ++index);
          tableRow.appendChild(id);
          let brand = createElementWithContent('td',item.brand);
          tableRow.appendChild(brand);
          let model = createElementWithContent('td', item.model);
          tableRow.appendChild(model);
          let version = createElementWithContent('td', item.version);
          tableRow.appendChild(version);
          let year = createElementWithContent('td', item.year);
          tableRow.appendChild(year);
          let color = createElementWithContent('td', item.color);
          tableRow.appendChild(color);
          let mileage = createElementWithContent('td', item.mileage);
          tableRow.appendChild(mileage);

          let tdImage = document.createElement('td');
          let imageTag = document.createElement('img');
          let aTag = document.createElement('a');

          aTag.setAttribute('href', item.image_url);
          aTag.setAttribute('target', '_blank');
          imageTag.setAttribute('src', item.image_url);
          aTag.appendChild(imageTag);
          tdImage.appendChild(aTag);

          tableRow.appendChild(tdImage);
          fragment.appendChild(tableRow);
        });

        $tableBody.getFirst().appendChild(fragment);
      }).catch(error => {
        console.log(error);
      });
    }

    function handleSubmit(event){
      event.preventDefault();
      let postURL = 'http://localhost:3000/cars';
      var formSerialized = serialize($carForm.getFirst());
      post(postURL,formSerialized);
    }

    function init() {
      loadTable();
      buildFormData();

      $carForm.on('submit', handleSubmit);
    }

    return {
      init: init
    };

  })(document, DOM);

  app.init();

})(document, DOM);
