export class Chapter {
    constructor(data){
        Object.assign(this, data);
        this.scale = "/scale/width/140";
    }

    render(){
        return  ` <div class="segment">
                    <div class="img-container ">
                        <img class="chapter" src="${this.imageUrl + this.scale}">
                        <div class="duration">${((this.duration/1000)/60).toFixed(2)}</div>
                    </div>
                    <div class="segment-text">${this.title}</div>
        </div>`
    }
}
