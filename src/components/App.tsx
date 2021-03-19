import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { Icon } from '../common/icons';
import './App.scss';

interface IProps {
  className?: string;
  active?: string;
}

const App: React.FC<IProps> = ({ className, active }: IProps) => {
  const [current = 'index', setCurrent] = useState(active);

  return (
    <Menu
      className={className}
      onClick={(item: any) => {
        setCurrent(item.key);
      }}
      selectedKeys={[current]}
      mode={'horizontal'}
    >
      <Menu.Item key={'index'} icon={<Icon type={'icon-face-recognize'} />}>
        <Link to="/">Face</Link>
      </Menu.Item>
      <Menu.Item key={'video'} icon={<Icon type={'icon-video'} />}>
        <Link to="/video">Video</Link>
      </Menu.Item>
    </Menu>
  );
};

export default App;
