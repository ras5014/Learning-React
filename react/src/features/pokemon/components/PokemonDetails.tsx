import { useGetPokemonByNameQuery } from "../../../services/pokemon"

export default function PokemonDetails() {
    const { data: pokemon, error, isLoading } = useGetPokemonByNameQuery('pikachu');

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading Pokémon details.</p>}
            {pokemon && (
                <>
                    <h3>{pokemon.species.name}</h3>
                    <img src={pokemon.sprites.front_shiny} alt={pokemon.species.name} />
                </>
            )}
        </div>
    )
}
