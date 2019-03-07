export default class SourceAsset {
    static  get  MIME_TYPES () {
        return {
            HDS: 'application/adobe-f4m',
            HLS: 'application/x-mpegURL',
            DASH: 'application/dash+xml',
            MP3: 'audio/mpeg',
            MP4: 'video/mp4',
            AAC: 'audio/mp4; codecs="mp4a.40.2"',
            OGG: 'audio/ogg; codecs="vorbis"'
        }
    };
}

