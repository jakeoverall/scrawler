import { generateId } from "../Utils/generateId.js";

export class Scrawl {
  constructor(data) {
    this.id = data.id || generateId()
    this.title = data.title || ''
    this.body = data.body || ''
    this.links = data.links || []
    this.color = data.color || ''
  }

  get ScrawlCardTemplate() {
    return /*html*/`
      <div class="my-2 selectable" onclick="app.scrawlsController.setActiveScrawl('${this.id}')">
        <span style="border-left: 8px solid; border-color: ${this.color};" class="ps-3"><b>${this.title}</b></span>
      </div>
    `
  }

  get ActiveTemplate() {
    return /*html*/`
        <div>
          <div class="mt-3 bg-dark p-1 d-flex align-items-center px-2">
            <b class="me-1 text-white">${this.title} > </b> 
            <button type="button" class="btn text-white text-uppercase" onclick="app.scrawlsController.showEdit()">Edit</button>
          </div>
          <div class="p-3">${this.body}</div>
        </div>
    `
  }

  get EditableTemplate() {
    return /*html*/`
      <form onsubmit="app.scrawlsController.updateScrawl()">
        <div class="mt-3 bg-dark p-1 d-flex align-items-center px-2">
        <b class="me-1 text-white">${this.title} > </b>  
        <button type="submit" class="btn text-white text-uppercase">Preview</button>
        </div>
      </div>
          <h4 class="my-4">${this.title}</h4>
          <textarea class="form-control" name="body" rows="15">${this.body}</textarea>
      </form>
    `
  }


}