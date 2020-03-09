class Advice {
    constructor(adviceDataObj) {
        this.id = adviceDataObj.id
        this.quote = adviceDataObj.quote
        this.user = new User(adviceDataObj.user)
    }
}