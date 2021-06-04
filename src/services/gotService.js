export default class gotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=4&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books?pageSize=20`);
        return res.map(this._transformBooks);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBooks(book);
    }

    getAllHouses = async () => {
        const res = await this.getResource(`/houses?pageSize=20`);
        return res.map(this._transformHouses);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouses(house);

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

    _transformHouses = (house) => {
        return {
            name: house.name,
            region: house.region || "Unknown",
            words: house.words || "Unknown",
            titles: house.titles ||"Unknown",
            ancestralWeapons: house.ancestralWeapons || "Unknown",
            id: this._extractId(house)
        }
    }

    _transformBooks = (book) => {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages || "Unknown",
            publisher: book.publisher || "Unknown",
            released: book.released || "Unknown",
            id: this._extractId(book)
        }
    }

}
