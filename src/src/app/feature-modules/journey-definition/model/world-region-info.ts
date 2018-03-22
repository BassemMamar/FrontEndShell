export class WorldRegionInfo {
    id: string;
    name: string;
    countries: CountryInfo[];
    constructor() {
        this.id = '';
        this.name = '';
        this.countries = new Array<CountryInfo>();
    }
}

export class CountryInfo {
    code: string;
    name: string;
    constructor() {
        this.code = '';
        this.name = '';
    }
}
