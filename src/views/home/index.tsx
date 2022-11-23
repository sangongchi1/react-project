import React from 'react';
import './index.css';
import { getDataone ,getPostData} from '../../api/index';

export default class HomeCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '触发请求',
    };
  }
  getState() {
    getPostData()
    getPostData()
    console.log('触发请求');
    
    getDataone();
    getDataone();
  }
  render(): React.ReactNode {
    return (
      <div className="home-container">
        <button className="btn" onClick={() => this.getState()}>
          {this.state.text}
        </button>
      </div>
    );
  }
}
