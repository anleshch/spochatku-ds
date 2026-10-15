import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight } from 'lucide-react'
import { Button } from '../Button/Button'
import { Price } from '../Price/Price'
import { OfferCard } from './OfferCard'

const meta = {
  title: 'Organisms/OfferCard',
  component: OfferCard,
  args: {
    date: '27.10.26',
    format: 'Online',
    title: 'Design for Monetization',
    description: 'Майстерклас про те, як бізнес заробляє гроші і як зробити дизайн, що цьому допомагає.',
    price: <Price align="right" price="600$" secondaryPrice="26800 UAH" />,
    action: <Button appearance="inverse">До консультацій</Button>,
    iconAction: <Button appearance="outlined" icon={<ArrowRight />} aria-label="Детальніше" />,
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['available', 'unavailable'] },
    price: { control: false },
    action: { control: false },
    iconAction: { control: false },
  },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 880 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=102-950' },
  },
} satisfies Meta<typeof OfferCard>

export default meta
type Story = StoryObj<typeof meta>

export const Available: Story = {}

export const Unavailable: Story = {
  args: { status: 'unavailable', note: 'Ще не запустили, але скорше за все буде у 2026' },
}

export const WithSticker: Story = { name: 'With sticker', args: { sticker: 'когорта - 7 місць' } }

export const Mobile: Story = {
  name: 'Mobile (< 1024 px)',
  globals: { viewport: { value: 'mobile2' } },
}
