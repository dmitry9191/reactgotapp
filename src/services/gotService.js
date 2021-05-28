export default class gotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        
        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=4&pageSize=10');
        return res.map(this._transformCharacter);
    }

    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllBooks() {
        const res = await this.getResource(`/books?pageSize=20`);
        return res.map(this._transformBooks);
    }

    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBooks(book);
    }

    async getAllHouses() {
        const res = await this.getResource(`/houses?pageSize=20`);
        return res.map(this._transformHouses);
    }

    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformCharacter(house);

    }

    _extractId(item) {
        const idRegExp = /\/((\d)*)$/;
        return item.url.match(idRegExp)[0];
    }

    _transformCharacter = (char) => {

        return {
            name: char.name,
            gender: char.gender,
            born: char.born || "Unknown",
            died: char.died || "Unknown",
            culture: char.culture || "Unknown",
            id: this._extractId(char)
        }
    }

    _transformHouses(house) {
        return {
            name: house.name,
            region: house.region || "Unknown",
            words: house.words || "Unknown",
            titles: house.titles ||"Unknown",
            overlord: house.overlord ||"Unknown",
            ancestralWeapons: house.ancestralWeapons || "Unknown"
        }
    }

    _transformBooks(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages || "Unknown",
            publiser: book.publiser || "Unknown",
            released: book.released || "Unknown"
        }
    }

}
