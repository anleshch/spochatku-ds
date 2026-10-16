import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { Button, type ButtonAppearance } from './Button'

const icons = { none: undefined, ArrowRight: <ArrowRight />, ArrowLeft: <ArrowLeft />, Plus: <Plus /> }

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    appearance: 'default',
    disabled: false,
  },
  argTypes: {
    appearance: { control: 'inline-radio', options: ['default', 'inverse', 'outlined'] },
    iconLeft: { control: 'select', options: Object.keys(icons), mapping: icons },
    iconRight: { control: 'select', options: Object.keys(icons), mapping: icons },
    icon: { table: { disable: true } },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=56-111' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Inverse: Story = { args: { appearance: 'inverse' } }

export const Outlined: Story = { args: { appearance: 'outlined' } }

export const WithIcons: Story = {
  args: { children: 'Записатися', iconRight: <ArrowRight /> },
}

export const IconOnly: Story = {
  args: { children: undefined, icon: <ArrowRight />, 'aria-label': 'Далі' } as never,
}

export const Small: Story = {
  name: 'Size S',
  args: { size: 's', appearance: 'outlined', children: 'Ідея клубу', iconRight: <ArrowRight /> },
}

export const AsLink: Story = {
  name: 'As link (href)',
  args: { children: 'Більше про Анну', appearance: 'inverse', href: 'https://annalishchynska.com/', target: '_blank' },
}

export const LongLabelTruncates: Story = {
  name: 'Long label (truncates)',
  args: { children: 'Дуже довгий текст кнопки, який не влазить у ширину контейнера' },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
}

/* All variants × states, like the Figma component set. States are forced with the pseudo-states addon. */
const appearances: ButtonAppearance[] = ['default', 'inverse', 'outlined']
const states = [
  { name: 'Default', id: undefined },
  { name: 'Hover', id: 'hover' },
  { name: 'Pressed', id: 'active' },
  { name: 'Focus', id: 'focus-visible' },
  { name: 'Disabled', id: 'disabled' },
] as const

function Matrix({ iconOnly, size = 'm' }: { iconOnly?: boolean; size?: 'm' | 's' }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(5, auto)', gap: 24, alignItems: 'center', justifyItems: 'start' }}>
      <span />
      {states.map((s) => (
        <span key={s.name} className="text-body-s-medium">{s.name}</span>
      ))}
      {appearances.map((appearance) => (
        <div key={appearance} style={{ display: 'contents' }}>
          <span className="text-body-s-medium">{appearance}</span>
          {states.map((s) => {
            const props = { appearance, disabled: s.id === 'disabled', id: s.id && s.id !== 'disabled' ? `${size}-${appearance}-${s.id}` : undefined }
            return iconOnly ? (
              <Button key={s.name} {...props} icon={<ArrowRight />} aria-label="Далі" />
            ) : (
              <Button key={s.name} {...props} size={size}>Button</Button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

const pseudo = Object.fromEntries(
  (['hover', 'active', 'focus-visible'] as const).map((p) => [
    p === 'focus-visible' ? 'focusVisible' : p,
    (['m', 's'] as const).flatMap((size) => appearances.map((a) => `#${size}-${a}-${p}`)),
  ]),
)

export const AllStates: Story = {
  name: 'All states — Label',
  render: () => <Matrix />,
  parameters: { pseudo },
}

export const AllStatesIconOnly: Story = {
  name: 'All states — IconOnly',
  render: () => <Matrix iconOnly />,
  parameters: { pseudo },
}

export const AllStatesSmall: Story = {
  name: 'All states — Size S',
  render: () => <Matrix size="s" />,
  parameters: { pseudo },
}
