import { appState } from "../AppState.js"
import { Scrawl } from "../Models/Scrawl.js"
import { saveState } from "../Utils/Store.js"

function save() {
  saveState('scrawls', appState.scrawls)
  saveState('activeScrawl', appState.activeScrawl)
}


class ScrawlsService {
  updateScrawl(formData) {
    appState.activeScrawl.body = formData.body
    appState.activeScrawl.links = formData.links || appState.activeScrawl.links
    appState.activeScrawl.color = formData.color || appState.activeScrawl.color
    save()
    appState.emit('activeScrawl')
  }

  addScrawl(formData) {
    const scrawl = new Scrawl(formData)
    appState.scrawls.push(scrawl)
    appState.emit('scrawls')
    this.setActiveScrawl(scrawl.id)
  }

  setActiveScrawl(id) {
    const scrawl = appState.scrawls.find(s => s.id == id)
    if (!scrawl) {
      throw new Error('Invalid Scrawl Id')
    }

    appState.activeScrawl = scrawl
    save()
  }

}


export const scrawlsService = new ScrawlsService()