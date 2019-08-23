import { Application } from 'stimulus'
import Autocomplete from '../src/autocomplete'

const application = Application.start()
application.register('autocomplete', Autocomplete)
