import { ParserBaseInterface } from "./parserInterface.js";

function createMarkdownParser() { return new MarkdownParser(); }

export class MarkdownSyntax {
    static h1 = 1;
    static h2 = 2;
    static h3 = 3;
    static h4 = 4;

    static uli = 5;
    static oli = 6;
    static todo = 7;

    static internalLink = 8;
    static externalLink = 9;

    static line = 10;
}

export class MarkdownParser extends ParserBaseInterface {
    constructor() {

    }

    analyseStart(start) {
        switch(start[0]) {
            case "#":
                // reading a heading
                const headingSize = this.#countHeadingSize(start);
                return {
                    id: headingSize,
                    element: `h${headingSize}`,
                    embedded: false
                }
            case "*":
            case "-":
                if (start.length !== 1) throw new Error("No more characters expected!");
                return {
                    id: MarkdownSyntax.uli,
                    element: "li",
                    embedded: true
                }
            case "1":
            case "a":
                return {
                    id: MarkdownSyntax.oli,
                    element: "li",
                    embedded: true
                }
            case "[":
                if (start[1] === "[" && start.length === 2) {
                    return {
                        id: MarkdownSyntax.internalLink,
                        element: "a",
                        embedded: false
                    }
                } else if (start.legnth === 1) {
                    return {
                        id: MarkdownSyntax.todo,
                        element: "li",
                        embedded: true
                    }
                }
                break;
            case "!": 
                // an image 
                break;
            case "?": 
                // an external bookmark 
                break;
            default:
                return {
                    id: MarkdownSyntax.line,
                    element: "line",
                    embedded: null
                }
        }
    }

    #countHeadingSize(start) {
        let count = 0;
        for (const elem of start) {
            if (elem !== "#") {
                throw new Error("Expected heading sign!");
            }
            count += 1;
        }
        return count;
    }

    analyseContent(element, content) {
        switch(element.id) {
            case MarkdownSyntax.h1:
            case MarkdownSyntax.h2:
            case MarkdownSyntax.h3:
            case MarkdownSyntax.h4:
                return content;
            case MarkdownSyntax.uli:
            case MarkdownSyntax.oli:
            case MarkdownSyntax.todo:

                break;
        }
    }

    #analyseNormalText() {
        
    }
}