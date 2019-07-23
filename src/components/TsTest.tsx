import * as React from 'react';

interface Props {
    text: string;
}

interface State {
    testNum: number
}

export default class TsTest extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            testNum: 1
        };

        setInterval(
            () => this.countUp(),
            1000
        );
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.text}
                <br />
                {this.state.testNum}
            </React.Fragment>
        )
    }

    private countUp() {
        this.setState({
            testNum: this.state.testNum + 1
        });
    }
}
