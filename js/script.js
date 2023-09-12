const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const pokemonInput = document.querySelector('.input_search');
const abilityElements = document.querySelectorAll('.ability');
const typeElements = document.querySelectorAll('.pokemon_type1, .pokemon_type2'); // Selecionar as classes pokemon_type1 e pokemon_type2

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (ApiResponse.status === 200) {
        const data = await ApiResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';

    const data = await fetchPokemon(pokemon);
    if (data) {
        if (data.types && data.types.length > 0) {
            typeElements.forEach((typeElement, index) => {
                if (data.types[index]) {
                    const typeName = data.types[index].type.name;
                    typeElement.textContent = typeName;
                    typeElement.style.display = 'inline-block'; // Exibir o tipo
                    typeElement.style.backgroundColor = getTypeColor(typeName);
                } else {
                    typeElement.textContent = ''; // Limpar o conteúdo
                    typeElement.style.display = 'none'; // Ocultar o tipo
                }
            });
        }

        // Manter o número de ID
        if (data.abilities && data.abilities.length > 0) {
            const abilities = [];
            for (const abilityData of data.abilities) {
                const abilityApiResponse = await fetch(abilityData.ability.url);
                if (abilityApiResponse.status === 200) {
                    const abilityData = await abilityApiResponse.json();
                    abilities.push(abilityData.name);
                }
            }
            abilityElements.forEach((element, index) => {
                element.textContent = abilities[index] || '...';
            });
        } 
        console.log('pokemon not found1')
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;

        pokemonInput.value = '';
        searchPokemon = data.id;
    } else {
        // Limpar os tipos do Pokémon
        typeElements.forEach((typeElement) => {
            typeElement.textContent = '';
            typeElement.style.display = 'none';
        });

        console.log('pokemon not found1');
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(pokemonInput.value.toLowerCase());
    pokemonInput.value = '';
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon < 1010) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);
