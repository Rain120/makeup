import * as React from 'react';
import './index.scss';

export interface IAboutProps {}

export default class About extends React.Component<IAboutProps> {
  public render() {
    return <div className="about-wrapper">About</div>;
  }
}
