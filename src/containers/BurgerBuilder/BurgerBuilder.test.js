import React from 'react';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { BurgerBuilder } from './BurgerBuilder';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {} } />);
  });
  it('should render <BuildControls /> when receiving ingredients  ', () => {
    wrapper.setProps({ings: {salad: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});