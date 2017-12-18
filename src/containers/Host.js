import React, { PureComponent, createElement } from 'react'
import { connect } from 'react-redux';

class Host extends Component {

    componentDidMount () {

    }
    componentWillReceiveProps(nextProps) {

        
    }

    render() {
        const { location, auth, menu } = this.props

        if (!auth.pending && !auth.authed) {
            return <Login />

        } else if (!auth.pending && auth.authed) {
            return <div className='main'>
                <Nav
                    location={location}
                    menuData={menu}
                />
                <div className='content'>
                    <Route path="/dashboard" exact render={({ location }) => { return createElement(Dashboard) }} />
                    <Route path="/assets/host" exact render={({ location }) => { return createElement(Host) }}/>
                </div>
            </div>

        }

    }
}


export default connect(state => ({ auth: _.get(state, 'auth', false), menu: _.get(state, 'menu', []) }))(Host)

