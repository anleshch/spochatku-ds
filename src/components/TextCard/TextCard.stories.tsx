import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextCard } from './TextCard'

const meta = {
  title: 'Organisms/TextCard',
  component: TextCard,
  args: {
    title: 'Місія',
    children:
      'Допомагаємо досвіченим дизайнерам і дизайн-лідерам мислити стратегічно, впливати на продукт і бізнес та рости далі.',
  },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 880 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=173-837' },
  },
} satisfies Meta<typeof TextCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Mobile: Story = { globals: { viewport: { value: 'mobile2' } } }

/* Як на сторінці «Про нас»: дві картки в ряд без проміжку (layout/card-gap = 0). */
export const Row: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--layout-card-gap)' }}>
      <TextCard {...args} />
      <TextCard title="Візія">Створюємо стратегічну освіту для досвічених дизайнерів в Україні.</TextCard>
    </div>
  ),
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 1760 }}><Story /></div>],
}

export const LongText: Story = {
  name: 'Long text (wraps)',
  args: {
    title: 'Дуже довгий заголовок картки, що переноситься',
    children: 'Довгий текст. '.repeat(30),
  },
}
