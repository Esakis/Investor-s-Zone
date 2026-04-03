// https://medium.com/front-end-weekly/loading-components-asynchronously-in-react-app-with-an-hoc-61ca27c4fda7

import { Component } from 'react';

const asyncComponent = (importComponent: () => Promise<any>) => {
    return class extends Component {
        state: { component: any } = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then((cmp: any) => {
                    this.setState({ component: cmp.default });
                });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
};

export default asyncComponent;