import { appState } from "../AppState.js";
import { scrawlsService } from "../Services/ScrawlsService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function drawScrawls() {

  let scrawlCards = ''

  appState.scrawls.forEach(s => scrawlCards += s.ScrawlCardTemplate)

  setHTML('scrawls', scrawlCards)
}
function drawActiveScrawl() {

  if (!appState.activeScrawl) {
    return setHTML('active-scrawl', /*html*/`
      <div>
        Write something today....
      </div>
    `)
  }

  setHTML('active-scrawl',
    appState.activeScrawl.ActiveTemplate
  )

}


export class ScrawlsController {
  constructor() {
    appState.on('scrawls', drawScrawls)
    appState.on('activeScrawl', drawActiveScrawl)
    drawScrawls()
    drawActiveScrawl()
  }


  addScrawl() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const formData = getFormData(form)
      scrawlsService.addScrawl(formData)
      // @ts-ignore
      form.reset()
    } catch (error) {
      Pop.error(error)
    }
  }

  updateScrawl() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      const formData = getFormData(form)
      scrawlsService.updateScrawl(formData)
    } catch (error) {
      Pop.error(error)
    }
  }

  setActiveScrawl(id) {
    try {
      scrawlsService.setActiveScrawl(id)
    } catch (error) {
      Pop.error(error)
    }
  }

  showEdit() {
    setHTML('active-scrawl', appState.activeScrawl.EditableTemplate)
  }

  async delete() {
    const yes = await Pop.confirm(`Delete ${appState.activeScrawl.title}?`, 'Are you sure you want to delete this Scrawl?')
    if (!yes) { return }
    scrawlsService.deleteScrawl()
  }


}