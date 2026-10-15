import type { Meta, StoryObj } from '@storybook/react-vite'
import { Backgrounds } from '../../storybook/Backgrounds'
import { List, ListItem } from './List'

const items = [
  'розуміємо мову та метрики бізнесу',
  'юніт-економіка',
  'метрики по воронці',
  'монетизаційні моделі',
  'як дизайнерам знаходити точки зростання в продукті',
  'ДЗ',
]

const meta = {
  title: 'Components/List',
  component: List,
  args: { children: null },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=67-116' },
  },
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <List style={{ width: 400 }}>
      {items.map((item) => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  ),
}

export const OnBackgrounds: Story = {
  name: 'On backgrounds',
  render: () => (
    <Backgrounds>
      <List>
        {items.slice(0, 4).map((item) => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </List>
    </Backgrounds>
  ),
}
