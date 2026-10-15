import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link, type LinkTone } from './Link'

const meta = {
  title: 'Components/Link',
  component: Link,
  args: { children: 'Посилання', href: '#', tone: 'default', disabled: false },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'subtle'] },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=102-182' },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Subtle: Story = { args: { tone: 'subtle' } }

export const OnDarkBackground: Story = {
  name: 'On dark background (inverse)',
  decorators: [
    (Story) => (
      <div data-mode="inverse" style={{ display: 'flex', gap: 24, padding: 32, borderRadius: 24, background: 'var(--color-bg-inverse)' }}>
        <Story />
        <Link href="#" tone="subtle">Політика конфіденційності</Link>
      </div>
    ),
  ],
}

const tones: LinkTone[] = ['default', 'subtle']
const states = [
  { name: 'Default', id: undefined },
  { name: 'Hover', id: 'hover' },
  { name: 'Pressed', id: 'active' },
  { name: 'Focus', id: 'focus-visible' },
  { name: 'Disabled', id: 'disabled' },
] as const

function Matrix({ prefix }: { prefix: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(5, auto)', gap: 32, alignItems: 'center', justifyItems: 'start' }}>
      <span />
      {states.map((s) => (
        <span key={s.name} className="text-body-s-medium">{s.name}</span>
      ))}
      {tones.map((tone) => (
        <div key={tone} style={{ display: 'contents' }}>
          <span className="text-body-s-medium">{tone}</span>
          {states.map((s) => (
            <Link
              key={s.name}
              href="#"
              tone={tone}
              disabled={s.id === 'disabled'}
              id={s.id && s.id !== 'disabled' ? `${prefix}-${tone}-${s.id}` : undefined}
            >
              Посилання
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

const pseudoFor = (prefix: string) =>
  Object.fromEntries(
    (['hover', 'active', 'focus-visible'] as const).map((p) => [
      p === 'focus-visible' ? 'focusVisible' : p,
      tones.map((t) => `#${prefix}-${t}-${p}`),
    ]),
  )

export const AllStates: Story = {
  name: 'All states',
  render: () => <Matrix prefix="light" />,
  parameters: { pseudo: pseudoFor('light') },
}

export const AllStatesInverse: Story = {
  name: 'All states — inverse',
  render: () => (
    <div data-mode="inverse" style={{ padding: 32, borderRadius: 24, background: 'var(--color-bg-inverse)', color: 'var(--color-text-inverse)' }}>
      <Matrix prefix="dark" />
    </div>
  ),
  parameters: { pseudo: pseudoFor('dark') },
}
