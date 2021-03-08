import Component from './';
import model from './model';
import mocks from './mocks.json';
import { storiesOf } from '@storybook/react';
import "../../styles/main.css"
mocks.forEach((variation) => {
  storiesOf(model.name, Component).add(variation.name, () => <Component slice={variation} />);
});
