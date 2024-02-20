
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
        const main = this.#analyseFront(content);
        if (main.identifier === 1) {
            main.payload = this.#analyseBetween(main.payload);
        }
        return main;
    }

    #analyseFront(content) {
        switch(content[0]) {
            case "#":
                return this.#parseHeading(content);
            case "*":
                return this.#parseUnorderedListItem(content.substring(1));
            default:
                throw new Error("Not supported!");
        }
    }

    #parseHeading(content) {
        let count = 0;
        for (const sign of content) {
            if (sign === "#") {
                count += 1;
                continue;
            }

            break;
        }

        return {
            identifier: 0,
            element: `h${count}`,
            payload: content.substring(count - 1),
        };
    }

    #ensureWhitespace(character) {
        if (character !== " ") {
            throw new Error("Expected whitespace!")
        }
    }

    #parseUnorderedListItem(content) {
        this.#ensureWhitespace(content[0]);
        return {
            identifier: 1,
            element: "li",
            payload: content.substring(1),
            embedded: "ul",
        }
    }

    #analyseBetween(content) {
        for (const elem in content) {
            switch(elem) {
                case "*":

                    break;
                default:
                    
                    break;
            }
        }
    }


}
