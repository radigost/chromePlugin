import { h, Component } from "preact";

export  class CompaniesList extends Component {
  render(props, { companies }) {
      console.log(this.props.companies)
    return (
        <ul>{this.props.companies ? this.props.companies.map((company) => {
            return <li>{company.name} (<small>{company.address_name}</small>)</li>
        }) : 'Loading...'}</ul>
        
    )
  }
}
