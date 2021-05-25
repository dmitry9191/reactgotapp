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

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=4&pageSize=10');
        return res.map(this._transformCharacter);
    }

    async getCharater(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks() {
        return this.getResource(`/books?pageSize=20`);
    }

    getBook(id) {
        return this.getResource(`/books/${id}`);
    }

    async getAllHouses() {
        const res = await this.getResource(`/houses?pageSize=20`);
        return res.map(this._transformHouses);
    }

    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformCharacter(house);

    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died || "no data",
            culture: char.culture
        }
    }

    _transformHouses(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _transformBooks(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }

}

const got = new gotService();

got.getAllHouses()
    .then(res => res.forEach(item => console.log(item.name)));

got.getHouse(2)
    .then(res => console.log(res.name));