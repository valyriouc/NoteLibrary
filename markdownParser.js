
export class CustomInputElement extends HTMLTextAreaElement {
    #currentTopLevel = null;
    #currentElement = null;
    constructor(parser, cols) {
        super();
        this.rows = 1;
        this.cols = cols;
        this.parser = parser;
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

export class ParserBaseInterface {
    parseInto(content) {
        throw new Error("Implement this method in a derived class!");
    }
}

export class MarkdownParser extends ParserBaseInterface {
    constructor() {
        super();
    }

    parseInto(content) {
        
    }

    #analyseFront(content) {

    }

    #analyseBetween(content) {

    }

}
