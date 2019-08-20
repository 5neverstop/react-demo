import React, { Component } from 'react'
import { Button, Input } from 'antd'
import load from './circle'

export default class CircleProgress extends Component {
	constructor(props) {
		super(props)
		this.timer = null;
		this.state = {
			percent: 10
		}
	}
	componentDidMount() {
		load.create('circleProgress');
		load.changePercent(this.state.percent);
	}

	componentWillUnmount() {
		this.stop()
	}


	start = () => {
		this.timer = setInterval(() => {
			let { percent } = this.state;
			load.changePercent(percent);
			percent === 100 ? percent = 0 : percent++;
			this.setState({
				percent: percent++
			})
		}, 100);
	}

	stop = () => {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}
	changePercent = (e) => {
		let percent = +e.target.value;
		if (percent === '' || percent < 0 || percent > 100) {
			percent = this.state.percent;
		}
		this.setState({
			percent
		})
		load.changePercent(percent)
	}
	render() {
		return (
			<div style={{ padding: " 50px 30px " }}>
				<div className=""  style={{ width: "500px", display: 'flex' }}>
					<div className=""  style={{width: '120px'}}>输入百分比：</div>
					<Input placeholder="输入百分比" type="number" defaultValue={this.state.percent} onChange={this.changePercent.bind(this)}></Input>
				</div>
				<div className="" style={{ padding: " 20px 0" }}>
					<Button onClick={this.start}>循环</Button>
					<Button onClick={this.stop}>停止</Button>
				</div>
				<canvas id="circleProgress" width="300" height="500" style={{ background: "#0cc" }}></canvas>
			</div>
		)
	}
}
