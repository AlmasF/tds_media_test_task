// нужно сделать динамическую таблицу, которая: 
//  - строится исходя из отправленных в неё данных (в JSON формате) (V)
//  - умеет фильтровать (V)
//  - умеет сортировать (V)
//  - желательно не использовать готовые библиотеки, нужно написать функции самому вручную (V)
//  - дизайн не имеет никакого значения (V)

const tableDiv = document.getElementById('table-data');
const searchInput = document.getElementById('search');
let form = document.getElementById('upload');
let file = document.getElementById('file');

let data = {
    "employees":[
        {
            name: 'Almas',
            age: 20
        },
        {
            name: 'Alex',
            age: 25
        },
        {
            name: 'Carl',
            age: 30
        },
        {
            name: 'Ziya',
            age: 23
        }
    ]
}

form.addEventListener('submit', handleSubmit);

function showTable(){

    let filteredData = data.employees.filter(
        (item) => (
            item.name.toLowerCase().includes(searchInput.value.toLowerCase())
            || `${item.age}`.includes(searchInput.value)
        )
    )

    tableDiv.innerHTML = '';
    for(let i = 0; i < filteredData.length; i++){
        tableDiv.innerHTML += 
        `
        <div class="item">
            <p>${i+1}</p>
            <p>${filteredData[i].name}</p>
            <p>${filteredData[i].age}</p>
        </div>
        `
    }
}

function sortTable(sortCol){
    data.employees = data.employees.sort(
        (a, b) => {
            if(a[sortCol] > b[sortCol])
                return 1;
            else 
                return -1;
        }
    );

    showTable();
}

function logFile (event) {
	let str = event.target.result;
	let json = JSON.parse(str);
    data = json;
    showTable();
    console.log(data);
}

function handleSubmit (event) {
	event.preventDefault();
	if (!file.value.length) return;
	let reader = new FileReader();
    reader.onload = logFile;
	reader.readAsText(file.files[0]);
}


showTable();