import type { Meta, StoryObj } from '@storybook/react-vite'
import { Backgrounds } from '../../storybook/Backgrounds'
import { Price } from './Price'

const meta = {
  title: 'Components/Price',
  component: Price,
  args: { price: '600$', secondaryPrice: '26800 UAH', align: 'center', state: 'default' },
  argTypes: {
    align: { control: 'inline-radio', options: ['center', 'right'] },
    state: { control: 'inline-radio', options: ['default', 'early-bird', 'unavailable'] },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=102-79' },
  },
} satisfies Meta<typeof Price>

export default meta
type Story = StoryObj<typeof meta>

const width240 = [(Story: () => React.JSX.Element) => <div style={{ width: 240 }}><Story /></div>]

export const Center: Story = { decorators: width240 }

export const Right: Story = { args: { align: 'right' }, decorators: width240 }

export const WithoutSecondary: Story = { name: 'Without secondary price', args: { secondaryPrice: undefined }, decorators: width240 }

const width360 = [(Story: () => React.JSX.Element) => <div style={{ width: 360 }}><Story /></div>]

export const EarlyBird: Story = {
  name: 'Early bird',
  args: { state: 'early-bird', discountedPrice: '510$', secondaryPrice: '23000 UAH', note: '−15% для Early bird – до 01.09 включно' },
  decorators: width360,
}

export const Unavailable: Story = {
  args: { state: 'unavailable', note: 'Ще не запустили, але буде у 2026' },
  decorators: width360,
}

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 360px)', gap: 48 }}>
      {(['center', 'right'] as const).map((align) => (
        <div key={align} style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          <Price align={align} price="600$" secondaryPrice="26800 UAH" />
          <Price align={align} state="early-bird" price="600$" discountedPrice="510$" secondaryPrice="23000 UAH" note="−15% для Early bird – до 01.09 включно" />
          <Price align={align} state="unavailable" note="Ще не запустили, але буде у 2026" />
        </div>
      ))}
    </div>
  ),
}

export const OnBackgrounds: Story = {
  name: 'On backgrounds',
  render: () => (
    <Backgrounds>
      <Price price="600$" secondaryPrice="26800 UAH" />
      <Price state="early-bird" price="600$" discountedPrice="510$" secondaryPrice="23000 UAH" note="−15% для Early bird – до 01.09 включно" />
    </Backgrounds>
  ),
}
