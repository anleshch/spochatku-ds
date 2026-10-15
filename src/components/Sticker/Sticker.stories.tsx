import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sticker } from './Sticker'

const meta = {
  title: 'Components/Sticker',
  component: Sticker,
  args: { children: 'когорта — 7 місць', appearance: 'inverse', size: 's', rotate: 0 },
  argTypes: {
    appearance: { control: 'inline-radio', options: ['default', 'inverse'] },
    size: { control: 'inline-radio', options: ['s', 'l'] },
    rotate: { control: { type: 'range', min: -15, max: 15, step: 1 } },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=62-27' },
  },
} satisfies Meta<typeof Sticker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { appearance: 'default' },
  parameters: { docs: { description: { story: 'Рожевий фон зливається з pink-bg — перемкни тему на beige-bg.' } } },
}

export const Inverse: Story = {}

export const Large: Story = { args: { size: 'l', children: 'старт нової когорти вже у листопаді' } }

export const Rotated: Story = { args: { rotate: -6 } }

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Sticker>sticker</Sticker>
      <Sticker appearance="inverse">sticker</Sticker>
      <Sticker size="l">sticker</Sticker>
      <Sticker size="l" appearance="inverse">sticker</Sticker>
    </div>
  ),
}
