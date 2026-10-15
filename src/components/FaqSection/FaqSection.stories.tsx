import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionItem } from '../Accordion/Accordion'
import { FaqSection } from './FaqSection'

const faq = [
  {
    title: 'У когорті 7 людей - Як відбувається відбір?',
    content:
      "Після заявки ми запрошуємо на коротке інтерв'ю: говоримо про твій досвід, цілі та очікування від програми. До когорти потрапляють 7 людей, яким формат дасть найбільше.",
  },
  { title: 'Чому саме 7 людей у когорті?', content: 'Текст відповіді (у Figma ще не заповнений).' },
  { title: 'Для якого рівня майстеркласи?', content: 'Текст відповіді (у Figma ще не заповнений).' },
]

const meta = {
  title: 'Organisms/FaqSection',
  component: FaqSection,
  args: {
    title: 'Питання, що у тебе певно виникли',
    children: (
      <Accordion>
        {faq.map((f) => (
          <AccordionItem key={f.title} title={f.title} content={f.content} />
        ))}
      </Accordion>
    ),
  },
  argTypes: { children: { control: false } },
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=123-1601' },
  },
} satisfies Meta<typeof FaqSection>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {}

export const Mobile: Story = {
  name: 'Mobile (< 1024 px)',
  globals: { viewport: { value: 'mobile2' } },
}
