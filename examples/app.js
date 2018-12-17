import { Application } from 'stimulus'
import { AutocompleteController } from '../index'

const application = Application.start()
application.register('autocomplete', AutocompleteController)
