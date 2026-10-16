import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { PageIntro } from './PageIntro'

const meta = {
  title: 'Organisms/PageIntro',
  component: PageIntro,
  args: {
    title: 'Спочатку почни, почни спочатку',
    description: 'Майстеркласи зі стратегічного дизайну для досвідчених продуктових дизайнерів',
    action: <Button href="#masterclasses">Обрати майстерклас</Button>,
  },
  argTypes: { action: { control: false } },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=173-870' },
  },
} satisfies Meta<typeof PageIntro>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TitleOnly: Story = { name: 'Title only', args: { description: undefined, action: undefined } }

export const Mobile: Story = { globals: { viewport: { value: 'mobile2' } } }

export const LongText: Story = {
  name: 'Long text (wraps)',
  args: {
    title: 'Дуже довгий заголовок сторінки, який переноситься на кілька рядків',
    description: 'Довгий підзаголовок. '.repeat(12),
  },
}
