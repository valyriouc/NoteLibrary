export class ParserBaseInterface {
    analyseStart(start) {
        throw new Error("Implement this method in a derived class!");
    }

    analyseContent(content) {
        
    }
}