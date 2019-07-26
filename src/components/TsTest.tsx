import * as React from 'react';

interface Iprops {
    text: string;
}

interface Istate {
    testNum: number
}

export default class TsTest extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
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
