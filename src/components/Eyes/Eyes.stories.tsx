import type { Meta, StoryObj } from '@storybook/react-vite'
import { Backgrounds } from '../../storybook/Backgrounds'
import { Eyes } from './Eyes'

const meta = {
  title: 'Components/Eyes',
  component: Eyes,
  args: { width: 48 },
  argTypes: { width: { control: { type: 'range', min: 24, max: 480, step: 4 } } },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=102-892' },
  },
} satisfies Meta<typeof Eyes>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Large: Story = { args: { width: 240 } }

export const OnBackgrounds: Story = {
  name: 'On backgrounds',
  render: () => (
    <Backgrounds>
      <Eyes />
    </Backgrounds>
  ),
}
