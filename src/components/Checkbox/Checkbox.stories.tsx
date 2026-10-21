import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    children: (
      <>
        Я погоджуюсь на збір та обробку моїх персональних даних та з умовами <a href="#">Політики конфіденційності</a>
      </>
    ),
  },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=244-2938' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = { args: { defaultChecked: true } }

export const Invalid: Story = { name: 'Error', args: { invalid: true } }

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } }

export const AllStates: Story = {
  name: 'All states',
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 760 }}>
      <Checkbox {...args}>Default</Checkbox>
      <Checkbox {...args} defaultChecked>Checked</Checkbox>
      <Checkbox {...args} id="cb-hover">Hover</Checkbox>
      <Checkbox {...args} id="cb-hover-on" defaultChecked>Checked · Hover</Checkbox>
      <Checkbox {...args} id="cb-focus">Focus</Checkbox>
      <Checkbox {...args} id="cb-focus-on" defaultChecked>Checked · Focus</Checkbox>
      <Checkbox {...args} disabled>Disabled</Checkbox>
      <Checkbox {...args} disabled defaultChecked>Checked · Disabled</Checkbox>
      <Checkbox {...args} invalid>Error</Checkbox>
    </div>
  ),
  decorators: [(Story) => <Story />],
  parameters: {
    pseudo: { hover: ['label:has(#cb-hover)', 'label:has(#cb-hover-on)'], focusVisible: ['#cb-focus', '#cb-focus-on'] },
  },
}
