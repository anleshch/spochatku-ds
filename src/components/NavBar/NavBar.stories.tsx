import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight } from 'lucide-react'
import { Button } from '../Button/Button'
import { Price } from '../Price/Price'
import { NavBar } from './NavBar'

const meta = {
  title: 'Organisms/NavBar',
  component: NavBar,
  args: {
    sticker: 'когорта - 7 місць',
    price: <Price price="600€" secondaryPrice="26800 UAH" />,
    action: <Button appearance="inverse">Зареєструватись</Button>,
    iconAction: <Button appearance="outlined" icon={<ArrowRight />} aria-label="Детальніше" />,
  },
  argTypes: {
    price: { control: false },
    action: { control: false },
    iconAction: { control: false },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=123-1806' },
  },
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  decorators: [(Story) => <div style={{ width: 838 }}><Story /></div>],
}

export const Mobile: Story = {
  name: 'Mobile (< 1024 px)',
  globals: { viewport: { value: 'mobile2' } },
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ position: 'fixed', insetInline: 0, bottom: 0 }}><Story /></div>],
}

export const EarlyBird: Story = {
  name: 'With early-bird price',
  args: {
    price: <Price state="early-bird" price="600€" discountedPrice="510€" secondaryPrice="23000 UAH" note="−15% для Early bird – до 01.09 включно" />,
  },
  decorators: [(Story) => <div style={{ width: 838 }}><Story /></div>],
}
