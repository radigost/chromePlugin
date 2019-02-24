// import _ from 'lodash'

import {h, render } from 'preact';


import {Clock} from './clock'

document.addEventListener('DOMContentLoaded', function() {
  render(<Clock />, document.body);
})