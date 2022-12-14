export default interface ITrack {
    album: {
        album_type: string,
        artists: object,
        external_urls: object,
        href: string,
        id: string,
        images: {
            height: number,
            url: string,
            width: number
        }[],
        name: string,
        release_date: string,
        release_date_precision: string,
        total_tracks: number,
        type: string,
        uri: string
    },
    artists: {
        external_urls: object,
        href: string,
        id: string,
        name: string,
        type: string,
        uri: string
    },
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: object,
    external_urls: object,
    href: string,
    id: string,
    is_local: boolean,
    is_playable: boolean,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string
}