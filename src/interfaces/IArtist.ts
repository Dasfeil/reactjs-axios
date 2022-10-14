export default interface IArtist {
    external_urls: object,
    followers: object,
    genres: string[],
    href: string,
    id: string,
    images: {
        height: number,
        url: string,
        width: number
    }[],
    name: string,
    popularity: number,
    type: string,
    uri: string
}