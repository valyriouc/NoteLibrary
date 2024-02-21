export class CustomInputElement extends HTMLTextAreaElement {
    #currentTopLevel = null;
    #currentElement = null;
    constructor(creatingParser, cols) {
        super();
        this.rows = 1;
        this.cols = cols;
        this.parser = creatingParser();
    }

    async connectedCallback() {

        // add event listener 
        this.addEventListener("keypress", this.#handleKeyPress);
    }

    #handleKeyPress(event){
        if (event.key === "Enter") {
            this.#currentElement = this.parser.parseInto(this.innerText);
        }
    }
}

customElements.define("custom-input", CustomInputElement, { extends: "textarea"});
