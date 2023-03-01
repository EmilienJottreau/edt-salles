var salles = [];
var lastDate = "";


function generatePage(data){
    salles = [];


    document.getElementById("search_bar").style.visibility = "visible";


    const div_salles = document.createElement('div');
    div_salles.className = "salles";
    document.body.appendChild(div_salles);
    const nom_salles = Object.keys(data);
    for(nom in nom_salles){
        salles.push(nom_salles[nom]);
    }

    
    for (let i = 0; i < nom_salles.length; i++) {
    
        
        const div_salle = document.createElement("div");
        //div_salle.textContent = "div numero " + i;
        div_salle.className += "card salle";
        div_salle.id = nom_salles[i];
        div_salles.appendChild(div_salle);
    
        const div_salle_title = document.createElement('div');
        div_salle_title.className += "title";
        div_salle_title.textContent = nom_salles[i];
    
        div_salle.appendChild(div_salle_title);
    
        const div_salle_content = document.createElement('div');
        div_salle_content.className += "content";
    
        div_salle.appendChild(div_salle_content);
    
    
    
        //heures sur le coté
        for(let j = 0 ; j< 12;j++){
            const div_horaire = document.createElement('div');
            div_horaire.textContent = 8+j + 'H00';
            div_horaire.className += 'horaire';
            div_horaire.style.gridRowStart = j+1;
            if(j%2==0) div_horaire.className += ' dark';
            else div_horaire.className += ' light';
            //if(j==0) div_horaire.style.borderTop = "solid black 1px";
            div_salle_content.appendChild(div_horaire);
            
        }
        const size_div_horaire = parseFloat(getComputedStyle(document.getElementsByClassName('horaire')[0]).height);
        
        for(let k = 0 ; k< data[nom_salles[i]].length;k++){ //data[i] = tableau des creneaux de la salle i
            const div_creneau = document.createElement('pre');
            div_creneau.className += 'creneau ' + nom_salles[i];
            const debut = data[nom_salles[i]][k].debut.substr(11,2) - 7;// + ;
            const fin = data[nom_salles[i]][k].fin.substr(11,2) - 6;// ((data[nom_salles[i]][k].fin.substr(14,2))/60);
            div_creneau.textContent +=  data[nom_salles[i]][k].debut.substr(11) + '\n';
            div_creneau.textContent +=  data[nom_salles[i]][k].fin.substr(11);

            //console.log('heure : ' + data[nom_salles[i]][k].debut.substr(11,2));
            //console.log('minute : ' + data[nom_salles[i]][k].debut.substr(14,2));
            const margTop = Math.round(size_div_horaire * (data[nom_salles[i]][k].debut.substr(14,2))/60)+"px";
            const margBot = Math.round(size_div_horaire * ((60-data[nom_salles[i]][k].fin.substr(14,2))/60))+"px";

            
            div_creneau.style.marginTop = margTop;
            div_creneau.style.marginBottom = margBot;
            div_creneau.style.gridRowStart = debut;
            div_creneau.style.gridRowEnd = fin - ((margBot=="0px") ? 1 : 0);
            div_salle_content.appendChild(div_creneau);
    
        }

        //placeHourIndicator
        const div_hour_indicator_container = document.createElement("div");
        div_hour_indicator_container.className = "hour_indicator_container";
        //position
        const today = new Date();
        var hh = today.getHours();
        const mm = today.getMinutes();
        hh=13;
        if(hh>19) hh = 19;
        div_hour_indicator_container.style.gridRowStart = hh-7;
        const div_hour_indicator = document.createElement("div");
        div_hour_indicator.className = "hour_indicator";
        const div_hour_indicator_triangle = document.createElement("div");
        div_hour_indicator_triangle.className = "hour_indicator_triangle";
        div_hour_indicator.style.top = String(size_div_horaire*mm/60)+'px';
        div_hour_indicator_triangle.style.top = String(size_div_horaire*mm/60)+'px';

        div_salle_content.appendChild(div_hour_indicator_container);
        div_hour_indicator_container.appendChild(div_hour_indicator);
        div_hour_indicator_container.appendChild(div_hour_indicator_triangle);
    }
}

function generateDate(){
    const div_date = document.createElement('div');
    document.body.appendChild(div_date);
    div_date.className = "date_selector";

    const div_date_jours  = document.createElement('div');
    const div_date_mois   = document.createElement('div');
    const div_date_annees = document.createElement('div');
    
    const input_date_jours  = document.createElement('input');
    const input_date_mois   = document.createElement('input');
    const input_date_annees = document.createElement('input');

    const label_date_jours  = document.createElement('label');
    const label_date_mois   = document.createElement('label');
    const label_date_annees = document.createElement('label');
    
    input_date_jours.type = "number";
    input_date_jours.inputMode = "numeric";
    input_date_jours.pattern = "[0-9]";
    input_date_jours.required = true;
    input_date_jours.maxLength = 2;
    input_date_jours.id = "jours";
    
    
    input_date_mois.type = "number";
    input_date_mois.inputMode = "numeric";
    input_date_mois.pattern = "[0-9]+";
    input_date_mois.required = true;
    input_date_mois.maxLength = 2;
    input_date_mois.id = "mois";
    
    input_date_annees.type = "number";
    input_date_annees.inputMode = "numeric";
    input_date_annees.pattern = "[0-9]";
    input_date_annees.required = true;
    input_date_annees.maxLength = 4;
    input_date_annees.id = "annees";

    label_date_jours.textContent = "Jours";
    label_date_mois.textContent = "Mois";
    label_date_annees.textContent = "Annees";

    div_date_jours.className = "date_container";
    div_date_mois.className = "date_container";
    div_date_annees.className = "date_container";
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    //base
    input_date_jours.value = dd;
    /////
    //pour debug
    //input_date_jours.value = 15;
    
    
    /////
    input_date_mois.value = mm;
    input_date_annees.value = yyyy;

    lastDate = yyyy + mm + "15";
    console.log(lastDate);
    
    const button_date = document.createElement('button');
    button_date.onclick = ()=>{getDate(0)};
    button_date.className = "button_date";
    button_date.textContent = "Valider";
    
    const button_previous_date = document.createElement('button');
    button_previous_date.onclick = ()=>{getDate(-1)};
    button_previous_date.className = "button_previous_date";
    button_previous_date.textContent = "<";
    
    const button_next_date = document.createElement('button');
    button_next_date.onclick = ()=>{getDate(1)};
    button_next_date.className = "button_next_date";
    button_next_date.textContent = ">";
    
    
    const div_date_invalid = document.createElement('div');
    div_date_invalid.id = "invalid_date";
    div_date_invalid.textContent = "Date invalide,  fait un effort !";
    div_date_invalid.style.visibility = "hidden";

    const input_search = document.createElement('input');
    input_search.id = "search_bar";
    input_search.onkeyup = search; //bind search function
    input_search.placeholder = "Cherchez votre salle !";
    input_search.style.visibility = "hidden";
    
    

    div_date_jours.appendChild(label_date_jours);
    div_date_jours.appendChild(input_date_jours);

    div_date_mois.appendChild(label_date_mois);
    div_date_mois.appendChild(input_date_mois);

    div_date_annees.appendChild(label_date_annees);
    div_date_annees.appendChild(input_date_annees);





    div_date.appendChild(button_previous_date);
    div_date.appendChild(div_date_jours);
    div_date.appendChild(div_date_mois);
    div_date.appendChild(div_date_annees);
    div_date.appendChild(button_next_date);
    div_date.appendChild(button_date);
    div_date.appendChild(input_search);
    div_date.appendChild(div_date_invalid);
}

async function make_request(date, forceReload)
{
    console.log(forceReload);
    const response = await fetch('https://edt-salles.alwaysdata.net/?date=' + date + "&forceReload=" + forceReload);
    const data = await response.json();
    return data;
}

function search(){
    const input_search_bar = String(document.getElementById("search_bar").value).toLowerCase();
    console.log(input_search_bar);
    
    //mettre en visibility hidden + position absolute
    //pensez a input vide = tout visible
    for(i in salles) {
        const salle_selected = document.getElementById(salles[i]);
        if(salles[i].toLowerCase().includes(input_search_bar) || input_search_bar == ""){
            salle_selected.style.visibility = "visible";
            salle_selected.style.position = "relative";
        } else {
            salle_selected.style.visibility = "hidden";
            salle_selected.style.position = "absolute";
        }
    }
}

async function getDate(offset){
    const div_date_invalid = document.getElementById("invalid_date");
    div_date_invalid.style.visibility = "hidden";
    //console.log("offset " + offset);
    
    const jours = document.getElementById("jours").value;
    const mois = document.getElementById("mois").value;
    const annees = document.getElementById("annees").value;
    
    var input_Date = new Date(Date.parse(annees + '-' + mois + '-' + jours));
    input_Date.setDate(input_Date.getDate() + offset);
    //console.log(input_Date);
    if(isNaN(input_Date)){
        //NaN = pas une date valide
        div_date_invalid.style.visibility = "visible";
        
        var today = new Date();
        
        document.getElementById("jours").value   = String(today.getDate()).padStart(2, '0');
        document.getElementById("mois").value    = String(today.getMonth()+1).padStart(2, '0');//why JavaScript ??
        document.getElementById("annees").value  = today.getFullYear();
        
    } else {
        document.getElementById("jours").value   = String(input_Date.getDate()).padStart(2, '0');
        document.getElementById("mois").value    = String(input_Date.getMonth()+1).padStart(2, '0');//why JavaScript ??
        document.getElementById("annees").value  = input_Date.getFullYear();
    }
    
    const new_jours = document.getElementById("jours").value;
    const new_mois = document.getElementById("mois").value;
    const new_annees = document.getElementById("annees").value;
    
    
    await main(String(new_annees) + String(new_mois) + String(new_jours));
    



    // selecteur pour salle info/campus santé
    // animation
    // revoir le style
    
    
    
    
}



async function main(date)
{
    const div_mask = document.getElementById("mask");
    const div_loader = document.getElementById("loader");
    //retirer l'ancien
    if(document.getElementsByClassName("salles").length !=0){
        document.body.removeChild(document.getElementsByClassName("salles")[0]);
    }
    div_mask.style.visibility = "visible";
    div_loader.style.visibility = "visible";
    //mettre truc de chargement
    const data = await make_request(date, ((date==lastDate) ? 1 : 0));
    lastDate = date;
    //console.log(data);
    generatePage(data);
    //retirer chargement
    div_mask.style.visibility = "hidden";
    div_loader.style.visibility = "hidden";
}

generateDate();



/*

(async () => {
    await main();
})();
*/

