export default class Idea {
    constructor(summary, input, parent, children = []) {
        this.summary = summary;
        this.input = input;
        this.parent = parent;
        this.children = children;
    }
}