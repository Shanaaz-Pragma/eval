import {NoteItem} from "../note-item/note-item.js";

/**
 * Notes Factory
 */
/*export class NotesFactory {

    /!**
     * Create a note instance
     * @param title
     * @param text
     * @returns {{text, title, createdOn: Date}}
     *!/
    create(title, text) {
        return {
            "title": title,
            "text": text,
            "createdOn": new Date()
        };
    }
}*/

export function NotesFactory(title, text) {
    return {
        "title": title,
        "text": text,
        "createdOn": new Date()
    };
}