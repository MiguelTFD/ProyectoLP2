document.addEventListener('DOMContentLoaded', function() {
  const departmentSelect = document.getElementById('inputDepartment');
  const provinceSelect = document.getElementById('inputProvince');
  const districtSelect = document.getElementById('inputDistrict');

  // Función para cargar departamentos
  function loadDepartments() {
    fetch('https://bogota-laburbano.opendatasoft.com/api/explore/v2.1/catalog/datasets/distritos-peru/records?select=*&group_by=nombdep&limit=-1')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data); // Verificar la estructura del JSON devuelto
          if (data && data.records) {
            data.records.forEach(record => {
              if (record.record && record.record.fields && record.record.fields.nombdep) {
                const option = document.createElement('option');
                option.value = record.record.fields.nombdep;
                option.textContent = record.record.fields.nombdep;
                departmentSelect.appendChild(option);
              }
            });
          } else {
            console.error('La API no devolvió el campo "records" como se esperaba.');
          }
        })
        .catch(error => console.error('Error al cargar departamentos:', error));
  }

  // Función para cargar provincias en base al departamento seleccionado
  departmentSelect.addEventListener('change', function() {
    const selectedDepartment = departmentSelect.value;
    provinceSelect.innerHTML = '<option selected>Seleccionar provincia...</option>';
    districtSelect.innerHTML = '<option selected>Seleccionar distrito...</option>';

    fetch(`https://bogota-laburbano.opendatasoft.com/api/explore/v2.1/catalog/datasets/distritos-peru/records?select=*&where=nombdep%3D%22${encodeURIComponent(selectedDepartment)}%22&group_by=nombprov&limit=-1`)
      .then(response => response.json())
      .then(data => {
        data.records.forEach(record => {
          const option = document.createElement('option');
          option.value = record.record.fields.nombprov;
          option.textContent = record.record.fields.nombprov;
          provinceSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error al cargar provincias:', error));
  });

  // Función para cargar distritos en base a la provincia seleccionada
  provinceSelect.addEventListener('change', function() {
    const selectedDepartment = departmentSelect.value;
    const selectedProvince = provinceSelect.value;
    districtSelect.innerHTML = '<option selected>Seleccionar distrito...</option>';

    fetch(`https://bogota-laburbano.opendatasoft.com/api/explore/v2.1/catalog/datasets/distritos-peru/records?select=*&where=nombdep%3D%22${encodeURIComponent(selectedDepartment)}%22%20and%20nombprov%3D%22${encodeURIComponent(selectedProvince)}%22&group_by=nombdist&limit=-1`)
      .then(response => response.json())
      .then(data => {
        data.records.forEach(record => {
          const option = document.createElement('option');
          option.value = record.record.fields.nombdist;
          option.textContent = record.record.fields.nombdist;
          districtSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error al cargar distritos:', error));
  });

  // Cargar los departamentos al cargar la página
  loadDepartments();
});

