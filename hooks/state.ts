
export const fetchAllAnimal = async (deviceId: string) => {
    console.log("fetchAllAnimal");
    const options = { method: 'GET', headers: { 'x-client-id': deviceId } };
    const response = await fetch('http://zoo.dwiegodzinydonikad.pl/animals/all', options);
    return await response.json();
};
export const fetchCaightAnimals = async (deviceId: string) => {
    console.log("fetchCaightAnimals");
    const options = { method: 'GET', headers: { 'x-client-id': deviceId } };
    const response = await fetch('http://zoo.dwiegodzinydonikad.pl/animals/unlocked', options);
    return await response.json();
};
