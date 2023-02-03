class NoteList extends HTMLElement {

    #shadowRoot;
    #clickHandler;

    /**
     * Standard constructor
     */
    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({"mode": "open"});
    }

    /**
     * Standard connectedCallback
     */
    async connectedCallback() {
        await this.#load();
    }

    /**
     * Standard disconnectedCallback
     * @returns {Promise<void>}
     */
    async disconnectedCallback() {
        this.#clickHandler = null;
        this.isReady = null;
        this.#shadowRoot = null;
    }

    async #load() {
        this.#shadowRoot.innerHTML = await fetch(import.meta.url.replace(".js", ".html")).then(r => r.text());

        requestAnimationFrame(() => {
            //set up dom for initial load
            //get notes data and create and display a note item for each item of notes

            this.#clickHandler = this.#click.bind(this);
            this.#shadowRoot.addEventListener("click", this.#clickHandler);

            console.log("ready");
            this.isReady = true;
        });
    }

    async keyup(e) {
        if (e.key === "Enter") {
            await this.click(e);
        }

    }
    async #click(e) {
        console.log(e.target);

        this[e.target.dataset.id] && await this[e.target.dataset.id](e);
    }

    async create(e) {
        //create new note
        console.log("create new note item");
    }

    async update(e) {
        //update new note
        console.log("update selected note item");
    }

    async delete(e) {
        //delete selected note
        console.log("delete selected note item");
    }

    async showDetail(e) {
        //create new note
        console.log("Show note detail");
    }
}

customElements.define("note-list", NoteList);