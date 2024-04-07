
    
    let body = document.getElementById('body');
   const dataStorage = [];
    let myChart;
   
    function getData() {
      const textNumber = document.createElement('p');
      textNumber.textContent = 'Ingresa los datos';
      body.appendChild(textNumber);
    
      const number = document.createElement('input');
      body.appendChild(number);
    
      const textCategory = document.createElement('p');
      textCategory.textContent = 'Selecciona la categoría';
      body.appendChild(textCategory);
    
      const selectCategory = document.createElement('select');
      selectCategory.className = 'form-select'; 
      selectCategory.innerHTML = `
        <option selected disabled>Selecciona una categoría</option>
        <option value="gastos">Gastos</option>
        <option value="ingresos">Ingresos</option>`;
      body.appendChild(selectCategory);
    
      const button = document.createElement('button');
      button.textContent = 'Submit';
      button.className = 'button btn btn-primary';
      button.id ="submit"
      button.onclick = function () {
        const newNumber = parseInt(number.value, 10);
       
        if (isNaN(newNumber)) {
          alert('Por favor, ingresa un número válido.');
          return;
        }
    
        const selectedOption = selectCategory.options[selectCategory.selectedIndex];
        const category = selectedOption.value.toLowerCase();
    
        let newData = {
          categoria: category,
          numeros: newNumber,
        };
    
        const index = dataStorage.findIndex(
          (item) => item.categoria === newData.categoria
        );
    
        if (newData.categoria === 'gastos') {
          if (index !== -1) {
            dataStorage[index].numeros += newData.numeros;
          } else {
            dataStorage.push(newData);
          }
        } else if (newData.categoria === 'ingresos') {
          if (index !== -1) {
            dataStorage[index].numeros -= newData.numeros;
          } else {
            newData.numeros = -newData.numeros;
            dataStorage.push(newData);
          }
        }
    
        exploitCharts(dataStorage);
        allReport(dataStorage);
        
      };
      body.appendChild(button);
      
    }
    
    

    function exploitCharts(data) {
      if (myChart) {
        myChart.destroy();
      }
      
      const ctx = document.getElementById('myChart');
      
      myChart = new Chart(ctx, {
        type: 'bar', 
        data: {
          labels: data.map((entry) => entry.categoria),
          datasets: [
            {
              label: 'Gastos',
              data: data.filter(entry => entry.categoria.toLowerCase() === 'gastos').map((entry) => entry.numeros),
              backgroundColor: 'rgba(255, 99, 132, 0.5)', 
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Ingresos',
              data: data.filter(entry => entry.categoria.toLowerCase() === 'ingresos').map((entry) => Math.abs(entry.numeros)), // Tomar el valor absoluto de los ingresos
              backgroundColor: 'rgba(54, 162, 235, 0.5)', 
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    
    
    

    function allReport(data) {
      const body = document.getElementById('all');
      while (body.firstChild) {
        body.removeChild(body.firstChild);
      }
      const resta = data.reduce(
        (total, entry) => total - parseFloat(entry.numeros || 0),
        0
      );
      const sendInfo = localStorage.setItem('dataStorage', JSON.stringify(dataStorage));
      const all = document.createElement('p');
      all.textContent = `El total restante es de : ${resta}`;
      body.appendChild(all);
    }

    getData();  
