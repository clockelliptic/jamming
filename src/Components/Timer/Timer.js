import React from "react";

export default class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          interval_ms: props.interval_ms,
          tick: props.tick
        };
    }
    componentDidMount() {
      this.interval = setInterval(() => this.state.tick(), this.state.interval_ms);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return <div />;
    }
  }
