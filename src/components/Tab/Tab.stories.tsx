import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tab, TabBar, type TabType } from './Tab'

const meta = {
  title: 'Components/Tab',
  component: Tab,
  args: { children: 'tab item', href: '#', type: 'default', disabled: false },
  argTypes: {
    type: { control: 'inline-radio', options: ['default', 'cta'] },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=41-14' },
  },
} satisfies Meta<typeof Tab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CTA: Story = { args: { type: 'cta' } }

export const Bar: Story = {
  name: 'TabBar',
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=41-15' },
  },
  render: () => (
    <TabBar aria-label="Основна навігація">
      <Tab href="#podcast">Подкаст</Tab>
      <Tab href="#about">Про нас</Tab>
      <Tab href="#alumni">Alumni клуб</Tab>
      <Tab href="#masterclasses" type="cta">Майстеркласи</Tab>
    </TabBar>
  ),
}

const types: TabType[] = ['default', 'cta']
const states = [
  { name: 'Default', id: undefined },
  { name: 'Hover', id: 'hover' },
  { name: 'Pressed', id: 'active' },
  { name: 'Focus', id: 'focus-visible' },
  { name: 'Disabled', id: 'disabled' },
] as const

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(5, auto)', gap: 24, alignItems: 'center', justifyItems: 'start' }}>
      <span />
      {states.map((s) => (
        <span key={s.name} className="text-body-s-medium">{s.name}</span>
      ))}
      {types.map((type) => (
        <div key={type} style={{ display: 'contents' }}>
          <span className="text-body-s-medium">{type}</span>
          {states.map((s) => (
            <Tab
              key={s.name}
              href="#"
              type={type}
              disabled={s.id === 'disabled'}
              id={s.id && s.id !== 'disabled' ? `${type}-${s.id}` : undefined}
            >
              tab item
            </Tab>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    pseudo: Object.fromEntries(
      (['hover', 'active', 'focus-visible'] as const).map((p) => [
        p === 'focus-visible' ? 'focusVisible' : p,
        types.map((t) => `#${t}-${p}`),
      ]),
    ),
  },
}
