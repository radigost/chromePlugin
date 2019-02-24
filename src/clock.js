import { h, render, Component } from "preact";
import  _ from 'lodash'
import { gisService } from "./gisService";
import {CompaniesList} from './companiesList'

export class Clock extends Component {
  constructor() {
    super();
    this.state.time = Date.now();
    this.state.companies = [];
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);

    chrome.tabs.getSelected(null, async tab => {
      const url = document.createElement("a");
      url.href = tab.url;

      const companies = await gisService.getSites(url);
      this.setState({ companies });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render(props, state) {
    let time = new Date(state.time).toLocaleTimeString();
    return (
      <div>
        <span>{time}</span>
        <CompaniesList companies={_.get(this.state.companies,'data.items')} />
      </div>
    );
  }
}
