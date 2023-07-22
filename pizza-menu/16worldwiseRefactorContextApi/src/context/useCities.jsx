import { useContext } from "react";


function useCities(value) {
    const context = useContext(value);
    if (context === undefined)
        throw new Error("CitiesContext was used outside the CitiesProvider");
    return context;
}

export { useCities }