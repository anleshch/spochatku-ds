import type { Meta, StoryObj } from '@storybook/react-vite'
import { ListItem } from '../List/List'
import { ProgramCard } from './ProgramCard'

const items = [
  'розуміємо мову та метрики бізнесу',
  'юніт-економіка',
  'метрики по воронці',
  'монетизаційні моделі',
  'як дизайнерам знаходити точки зростання в продукті',
  'ДЗ',
]

const meta = {
  title: 'Organisms/ProgramCard',
  component: ProgramCard,
  args: {
    tag: 'Week 1',
    title: 'Metrics',
    children: items.map((i) => <ListItem key={i}>{i}</ListItem>),
  },
  argTypes: { children: { control: false } },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 880 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=102-951' },
  },
} satisfies Meta<typeof ProgramCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutTag: Story = { name: 'Without tag', args: { tag: undefined } }

export const Mobile: Story = { globals: { viewport: { value: 'mobile2' } } }
