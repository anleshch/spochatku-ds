import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from './ProgressBar'

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: { value: 0.4, 'aria-label': 'Прогрес заповнення форми' },
  argTypes: { value: { control: { type: 'range', min: 0, max: 1, step: 0.2 } } },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=244-2882' },
  },
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllValues: Story = {
  name: 'All values',
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      {[0.2, 0.4, 0.6, 0.8, 1].map((v) => (
        <ProgressBar key={v} {...args} value={v} />
      ))}
    </div>
  ),
}
