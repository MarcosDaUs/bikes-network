import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  type: 'button',
  disabled: false,
  className: '',
  noHover: false,
  children: 'hola!',
  onClick: () => console.log('onClick'),
};
