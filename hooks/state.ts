
export const fetchAllAnimal = async (deviceId: string) => {
    console.log("fetchAllAnimal");
    const options = { method: 'GET', headers: { 'x-client-id': deviceId } };
    const response = await fetch('http://zoo.dwiegodzinydonikad.pl/animals/all', options);
    return await response.json();
};
export const fetchCaughtAnimals = async (deviceId: string) => {
    console.log("fetchCaughtAnimals");
    const options = { method: 'GET', headers: { 'x-client-id': deviceId } };
    const response = await fetch('http://zoo.dwiegodzinydonikad.pl/animals/unlocked', options);
    return await response.json();
};

export const fetchRanking = async (deviceId: string) => {
    console.log("fetchRanking");
    const options = { method: 'GET', headers: { 'x-client-id': deviceId } };
    const response = await fetch('http://zoo.dwiegodzinydonikad.pl/ratingList', options);
    return await response.json();
};
