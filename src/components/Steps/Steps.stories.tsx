import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight } from 'lucide-react'
import { Backgrounds } from '../../storybook/Backgrounds'
import { Button } from '../Button/Button'
import { StepItem, StepNumber, Steps, StepsCta } from './Steps'

const steps = [
  { title: 'Реєстрація через сайт', description: 'Менеджер напише протягом 2х днів' },
  { title: 'Інтерв‘ю з Анною' },
  { title: 'Оплата через IBAN або Apple Pay', description: 'Індивідуальна або інвойсом для компанії' },
]

const stepItems = steps.map((s, i) => <StepItem key={s.title} number={i + 1} title={s.title} description={s.description} />)

const meta = {
  title: 'Components/Steps',
  component: Steps,
  args: { children: null },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=67-141' },
  },
} satisfies Meta<typeof Steps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Steps style={{ width: 530 }}>{stepItems}</Steps>,
}

export const WithAction: Story = {
  name: 'StepsCta',
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=67-166' },
  },
  render: () => (
    <StepsCta
      style={{ width: 530 }}
      action={<Button appearance="inverse">Реєстрація у Waitlist</Button>}
      iconAction={<Button appearance="outlined" icon={<ArrowRight />} aria-label="Детальніше" />}
    >
      {stepItems}
    </StepsCta>
  ),
}

export const StepNumberOnly: Story = {
  name: 'StepNumber',
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=65-21' },
  },
  render: () => <StepNumber>1</StepNumber>,
}

export const OnBackgrounds: Story = {
  name: 'On backgrounds',
  render: () => (
    <Backgrounds>
      <Steps>{stepItems}</Steps>
    </Backgrounds>
  ),
}
