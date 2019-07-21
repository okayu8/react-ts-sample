import * as React from 'react';

interface Props {
    text: string;
}

interface State {
    testState: string
}

export default class TsTest extends React.Component<Props, State> {
    public render() {
        return (
            <React.Fragment>
                {this.props.text}
            </React.Fragment>
        )
    }
}
