import type { Meta, StoryObj } from '@storybook/react-vite'
import { Backgrounds } from '../../storybook/Backgrounds'
import { Logo, LogoBadge } from './Logo'

const meta = {
  title: 'Components/Logo',
  component: Logo,
  args: { width: 88 },
  argTypes: { width: { control: { type: 'range', min: 44, max: 440, step: 4 } } },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=79-109' },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnBackgrounds: Story = {
  name: 'On backgrounds',
  render: () => (
    <Backgrounds>
      <Logo />
    </Backgrounds>
  ),
}

export const Badge: Story = {
  name: 'LogoBadge',
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=79-115' },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24, background: 'var(--color-bg-subtle)' }}>
      <LogoBadge shape="circle" size={300} />
      <LogoBadge shape="square" size={300} />
    </div>
  ),
}
