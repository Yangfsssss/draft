import React from 'react';

export default class SetStateTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 0,
    };
  }

  clickHandler = () => {
    console.log('---- start ----');

    Promise.resolve().then(() => {
      console.log('promise then'); // callback
    })
    
    // “异步”
    this.setState(
      {val: this.state.val + 1},
      () => console.log('state', this.state.val) // callback
    );
    // console.log('state...', this.state);
    
    console.log('---- end ----');
  };

  componentDidMount() {
    // setTimeout(()=>{
    //   console.log('---- start ----');

    //   Promise.resolve().then(() => {
    //     console.log('promise then');
    //   })
      
    //   this.setState({
    //     val: this.state.val + 1,
    //   })
    //   console.log('state...', this.state);
      
    //   console.log('---- end ----');
    // })
  }

  render() {
    return (
      <div>
        <p id='p1' onClick={this.clickHandler}>SetStateTask: {this.state.val}</p>
      </div>
    );
  }
}