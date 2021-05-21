export default class gotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}
                             , received ${res.status}`);
        }
        
        return await res.json();
    }

    getAllCharacters() {
        return this.getResource('/characters?page=4&pageSize=10');
    }

    getCharater(id) {
        return this.getResource(`/characters/${id}`);
    }

    getAllBooks() {
        return this.getResource(`/books?pageSize=20`);
    }

    getBook(id) {
        return this.getResource(`/books/${id}`);
    }

    getAllHouses() {
        return this.getResource(`/houses?pageSize=20`);
    }

    getHouse(id) {
        return this.getResource(`/houses/${id}`);
    }

}

const got = new gotService();

got.getAllHouses()
    .then(res => res.forEach(item => console.log(item.name)));

got.getHouse(2)
    .then(res => console.log(res.name));