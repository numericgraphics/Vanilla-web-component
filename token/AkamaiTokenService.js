export default class AkamaiTokenService {
    /**
     * Get the acl path
     *
     * @param {String} streamUrl
     * @returns the acl path
     */
    aclPath(streamUrl) {
        let acl;

        if (streamUrl.includes('/hls/playingLive/')) {
            acl = '/hls/playingLive/*';
        } else {
            let parser = document.createElement('a');
            parser.href = streamUrl;

            let path = parser.pathname;
            acl = path.substring(0, path.lastIndexOf('/') + 1) + '*';
        }

        return acl;
    }

    /**
     * Generate the stream URL with the akamai token
     *
     * @param {String} streamUrl
     */
    tokenize(streamUrl) {
        streamUrl = new String(streamUrl);

        let acl = this.aclPath(streamUrl);
        const url = 'https://tp.srgssr.ch/akahd/token?acl=' + encodeURIComponent(acl);

        return fetch(url).then(response => {
            if (response.ok) {
                return response.json().then((data) => {
                    console.log('Token received.');

                    let separator;
                    if (streamUrl.includes('?')) {
                        separator = '&';
                    } else {
                        separator = '?';
                    }

                    let tokenizedUrl = streamUrl + separator + data.token.authparams;
                    return tokenizedUrl;
                });
            } else {
                console.log("ERROR TOKEN");
            }
        });
    }
}
