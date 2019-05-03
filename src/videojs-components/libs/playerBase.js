
export class PlayerBase  {
    constructor(){
        this._player = null;
    }

    get player() {
        return this._player;
    }

    set player(player) {
        this._player = player;
    }

    get currentTime () {
        return this._player.currentTime();
    }

    set source(source){
        this._player.src(source);
    }
}
