import { ComponentStory, ComponentMeta } from '@storybook/react';

import Alert from './Alert';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: 'atoms/Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  message: 'Alert Test',
  show: true,
  loading: false,
  identifier: null,
  className: '',
  startAlertHandler: (id: NodeJS.Timeout | null) =>
    console.log('startAlertHandler: ', id),
  finishAlertHandler: () => console.log('finishAlertHandler'),
};
