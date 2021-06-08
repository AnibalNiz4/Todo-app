const input = document.querySelector('.input');
let number = document.getElementById('.number');
let quantity_dates;
let value_storage = [];
const dragArea = document.querySelector('.dates_container');
const all = document.querySelector('.all');
const active = document.querySelector('.active');
const completed = document.querySelector('.completed');
const dates_container = document.querySelector('.dates_container');
const clear_completed = document.querySelector('.clear_completed');
const check_active = document.querySelector('.check_active');
const check_completed = document.querySelector('.check_completed');
const change_design = document.querySelector('.change_design');
const background = document.querySelector('.background');
const circle = document.querySelector('.circle');
const text = document.querySelector('.text');
const actions = document.querySelector('.actions');

if(localStorage.getItem('value_storage') == []){
    quantity_dates = 0;
}else{
    quantity_dates = JSON.parse(localStorage.getItem('value_storage')).length;
}

document.addEventListener('DOMContentLoaded', () =>{
    let storage_input = JSON.parse(localStorage.getItem('value_storage'));

    storage_input.forEach(element => {
        addDate(element);
    });

    number.innerHTML = quantity_dates;

    datesLights();
});

input.addEventListener('keyup', (e) => {
    let input_value = e.path[0].value;
    let keycode = e.keyCode || e.which;
    if (keycode == 13) {
        if(input_value.length > 0){
            pushStorage(input_value);
            let storage_input = JSON.parse(localStorage.getItem('value_storage'));
            addDate(storage_input[quantity_dates]);
            quantity_dates++;
            e.path[0].value = "";
            number.innerHTML = quantity_dates;
            datesLights();
        }
    }
});

function removeElement(event){
    console.log(event.toElement.parentElement);
    let current_storage = JSON.parse(localStorage.getItem('value_storage'));

    for(i = 0; i<current_storage.length; i++){
        if(event.target.parentElement.parentElement.innerText == current_storage[i]){
            current_storage.splice(i,1);
            localStorage.setItem('value_storage', JSON.stringify(current_storage));
        }
    }

    event.target.parentElement.parentElement.remove();
    quantity_dates--;
    number.innerHTML = quantity_dates;

}

function pushStorage(info){
    let Store_info = JSON.parse(localStorage.getItem("value_storage")) || [];

    Store_info.push(info);
    let info_json = JSON.stringify(Store_info);
    localStorage.setItem("value_storage", info_json);
}

const addDate = (info) =>{
    const dates = document.createElement('div');
    const circle = document.createElement('div');
    const date_p = document.createElement('p');
    const cross = document.createElement('div');
    const img = document.createElement('img');

    dates.classList.add('dates');
    dates.classList.add('check_active');
    circle.classList.add('check');
    circle.classList.add('bkg_null');
    circle.addEventListener("click", checkItem);
    date_p.classList.add('date_p');
    cross.classList.add('cross');
    img.addEventListener("click", removeElement);
    img.src = "../scss/images/icon-cross.svg";

    date_p.textContent = info;
    dates_container.appendChild(dates);
    dates.appendChild(circle);
    dates.appendChild(date_p);
    dates.appendChild(cross);
    cross.appendChild(img);
}

function checkItem(event){
    if(event.toElement.className == 'check bkg_null' || event.toElement.className == 'check bkg_null check_light'){
        event.toElement.className = 'check bkg_style';
        event.target.parentElement.classList.add('check_completed');
        event.target.parentElement.classList.remove('check_active');
    }
    else if(event.toElement.className == 'check bkg_style' || 'check bkg_style check_light'){
        event.toElement.className = 'check bkg_null';
        event.target.parentElement.classList.add('check_active');
        event.target.parentElement.classList.remove('check_completed');
    }

    for(let i = 0; i<quantity_dates; i++){
        if(dates_container.children[i].classList.contains('check_completed')){
            dates_container.children[i].children[1].classList.add('date_italic')
        }
        else{
            dates_container.children[i].children[1].classList.remove('date_italic');
        }
    }
}

all.addEventListener('click', () =>{
    all.style.color = '#3a7bfd';
    active.style.color = '#9394a5';
    completed.style.color = '#9394a5';

    for(let i = 0; i<dates_container.children.length; i++){
        dates_container.children[i].style.display = 'flex';
    }
});

active.addEventListener('click', () =>{
    all.style.color = '#9394a5';
    active.style.color = '#3a7bfd';
    completed.style.color = '#9394a5';

    for(let i = 0; i<dates_container.children.length; i++){
        if(dates_container.children[i].classList.contains('check_completed')){
            dates_container.children[i].style.display = 'none';
        }
        if(dates_container.children[i].classList.contains('check_active')){
            dates_container.children[i].style.display = 'flex';
        }
    }
});

completed.addEventListener('click', () =>{
    all.style.color = '#9394a5';
    active.style.color = '#9394a5';
    completed.style.color = '#3a7bfd';

    for(let i = 0; i<dates_container.children.length; i++){
        if(dates_container.children[i].classList.contains('check_active')){
            dates_container.children[i].style.display = 'none';
        }
        if(dates_container.children[i].classList.contains('check_completed')){
            dates_container.children[i].style.display = 'flex';
        }
    }
});

clear_completed.addEventListener('click', () =>{
    let current_storage = JSON.parse(localStorage.getItem('value_storage'));

    for(let i = 0; i<dates_container.children.length; i++){
        if(dates_container.children[i].classList.contains('check_completed')){
            for(let j = 0; j<current_storage.length; j++){
                if(dates_container.children[i].textContent == current_storage[j]){
                    current_storage.splice(j,1);
                    localStorage.setItem('value_storage', JSON.stringify(current_storage));
                    j--;
                    quantity_dates--;
                    number.innerHTML = quantity_dates;
                }
            }
            dates_container.children[i].remove();
            i--;
        }
    }
});

new Sortable(dragArea, {
    animation: 350
})

change_design.onclick = () =>{
    console.log(dates_container);
    if(change_design.classList.contains('sun')){
        change_design.classList.remove('sun');
        change_design.src = '/scss/images/icon-moon.svg';
        background.classList.add('background_light');
        document.body.style.background = 'rgb(228, 229, 241)';
        circle.classList.add('circle_light');
        text.classList.add('text_light');
        actions.classList.add('actions_light');
    }
    else{
        change_design.classList.add('sun');
        change_design.src = '/scss/images/icon-sun.svg';
        background.classList.remove('background_light');
        document.body.style.background = 'rgb(22, 23, 34)';
        circle.classList.remove('circle_light');
        text.classList.remove('text_light');
        actions.classList.remove('actions_light');
    }
    datesLights();
}

const datesLights = () =>{
    for(let i = 0; i<quantity_dates; i++){
        if(dates_container.parentNode.parentNode.classList.contains('background_light')){
            dates_container.children[i].classList.add('dates_light');
            dates_container.children[i].children[0].classList.add('check_light');
        }
        else{
            dates_container.children[i].classList.remove('dates_light');
            dates_container.children[i].children[0].classList.remove('check_light');
        }
    }
}
