import type { Meta, StoryObj } from '@storybook/react-vite'
import { Backgrounds } from '../../storybook/Backgrounds'
import { Accordion, AccordionItem } from './Accordion'

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
  title: 'Components/Accordion',
  component: AccordionItem,
  args: { title: faq[0].title, content: faq[0].content, disabled: false },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=80-62' },
  },
} satisfies Meta<typeof AccordionItem>

export default meta
type Story = StoryObj<typeof meta>

const width720 = [(Story: () => React.JSX.Element) => <div style={{ width: 720 }}><Story /></div>]

export const Item: Story = { name: 'AccordionItem', decorators: width720 }

export const ItemExpanded: Story = { name: 'AccordionItem — expanded', args: { defaultExpanded: true }, decorators: width720 }

export const List: Story = {
  name: 'Accordion',
  decorators: width720,
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=80-71' },
  },
  render: () => (
    <Accordion>
      {faq.map((f) => (
        <AccordionItem key={f.title} title={f.title} content={f.content} />
      ))}
    </Accordion>
  ),
}

const states = [
  { name: 'Default', id: undefined },
  { name: 'Hover', id: 'hover' },
  { name: 'Pressed', id: 'active' },
  { name: 'Focus', id: 'focus-visible' },
  { name: 'Disabled', id: 'disabled' },
] as const

export const AllStates: Story = {
  name: 'All states',
  decorators: [(Story) => <Story />],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 720px 720px', gap: 32, alignItems: 'start' }}>
      <span />
      <span className="text-body-s-medium">Expanded = false</span>
      <span className="text-body-s-medium">Expanded = true</span>
      {states.map((s) => (
        <div key={s.name} style={{ display: 'contents' }}>
          <span className="text-body-s-medium">{s.name}</span>
          {[false, true].map((expanded) => (
            <AccordionItem
              key={String(expanded)}
              title={faq[0].title}
              content={faq[0].content}
              defaultExpanded={expanded}
              disabled={s.id === 'disabled'}
              triggerId={s.id && s.id !== 'disabled' ? `${s.id}-${expanded}` : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    pseudo: Object.fromEntries(
      (['hover', 'active', 'focus-visible'] as const).map((p) => [
        p === 'focus-visible' ? 'focusVisible' : p,
        [`#${p}-false`, `#${p}-true`],
      ]),
    ),
  },
}

export const OnBackgrounds: Story = {
  name: 'On backgrounds',
  render: () => (
    <Backgrounds>
      <AccordionItem title={faq[0].title} content={faq[0].content} defaultExpanded />
    </Backgrounds>
  ),
}
