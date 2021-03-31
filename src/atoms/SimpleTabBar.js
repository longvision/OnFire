import React from 'react';
import { Tab, TabBar } from '@ui-kitten/components';
// import { Container } from './styles';

const SimpleTabBar = ({ selectedIndex, onSelect, tabsArray }) => (
    <TabBar selectedIndex={selectedIndex} onSelect={onSelect}>
      {tabsArray.map((i) => (
        <Tab key={i} title={i} />
      ))}
    </TabBar>
);

export default SimpleTabBar;
