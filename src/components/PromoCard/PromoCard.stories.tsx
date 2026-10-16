import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight } from 'lucide-react'
import { Button } from '../Button/Button'
import placeholder from '../../storybook/placeholder-photo.svg'
import { PromoCard } from './PromoCard'

const meta = {
  title: 'Organisms/PromoCard',
  component: PromoCard,
  args: {
    title: '−30% на наступні майстеркласи',
    description: 'Діє для випускників і їхнього +1 друга.',
    illustration: placeholder,
    action: (
      <Button size="s" appearance="inverse" href="#" iconRight={<ArrowRight />}>
        Отримати знижку
      </Button>
    ),
  },
  argTypes: {
    appearance: { control: 'inline-radio', options: ['default', 'outlined'] },
    action: { control: false },
  },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 880 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=174-931' },
  },
} satisfies Meta<typeof PromoCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outlined: Story = { args: { appearance: 'outlined' } }

export const WithoutIllustration: Story = { name: 'Without illustration', args: { illustration: undefined } }

export const Mobile: Story = { globals: { viewport: { value: 'mobile2' } } }

export const LongText: Story = {
  name: 'Long text (wraps)',
  args: {
    title: 'спочатку розкажи — Co-writing клуб для випускників, які хочуть писати',
    description: 'Можливість розвивати особистий бренд через тексти. '.repeat(4),
  },
}
