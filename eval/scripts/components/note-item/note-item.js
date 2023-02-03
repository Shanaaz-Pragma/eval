/***
 * This class is used to create a note object
 */

export class NoteItem extends HTMLElement {

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
            const title = this.#shadowRoot.querySelectorAll("data-title");
            const text = this.#shadowRoot.querySelectorAll("data-text");
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

    /*async create(e) {
        //create new note
        console.log("create new note");
        const options = {
            "title": this.#shadowRoot.querySelectorAll("[data-id='title']"),
            "text": this.#shadowRoot.querySelectorAll("[data-id='text']"),
            "created": new Date(),
            "modified": new Date()
        }
        await NotesFactory.create(...options);
    }*/

    async update(e) {
        //update a note
        console.log("update a note");
    }

    async delete(e) {
        //delete a note
        console.log("delete note");
    }
}

customElements.define("note-item", NoteItem);