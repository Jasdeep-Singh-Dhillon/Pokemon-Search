$(document).ready(main);

var apiUrl = "https://pokeapi.co/api/v2/pokemon/";

function main() {
    url = apiUrl + "1";
    $("#search_btn").on("click", getPokemon);
}

async function getPokemon() {
    let input = $("#search_input").val().toLowerCase();

    if (!verifyInput(input)) {
        return;
    }

    let url = apiUrl + input;
    let data = await fetchUrl(apiUrl + input);
    if (data == null) {
        verifyInput('');
        return;
    }
    displayPokemonInformation(data);
}

function displayPokemonInformation(data) {
    console.log(data);
    data.sprites.other["official-artwork"].front_default
    data.name

    let types = "";
    for (i = 0; i < data.types.length; i++) {
        types = types + `<span class="type ${data.types[i].type.name}">${data.types[i].type.name}</span>`
    }

    $("#pokemon_info").html(`<div id="pokemon_info">
    <div class="card pokemon-info">
        <div class="card-image">
            <img src=${data.sprites.other["official-artwork"].front_default} alt="${data.name} Image" width='250px'>
        </div>
        <h3>${data.name}</h3>
        <div class="d-flex">
            ${types}
        </div>
    </div>
</div>`)
}

function verifyInput(input) {
    if (input.length > 0) {
        $("#validation").html('');
        $("#validation").css('padding-bottom', '0rem');
        return true;
    }
    $("#validation").html('Input a valid pokemon name');
    $("#validation").css('padding-bottom', '1rem');
    return false;
}

async function fetchUrl(url) {
    let response = await fetch(url);

    if (response.status == 404) {
        return null;
    }
    let data = await response.json();
    return data;
}