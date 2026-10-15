import type { Meta, StoryObj } from '@storybook/react-vite'
import { Backgrounds } from '../../storybook/Backgrounds'
import { Price } from './Price'

const meta = {
  title: 'Components/Price',
  component: Price,
  args: { price: '600$', secondaryPrice: '26800 UAH', align: 'center' },
  argTypes: { align: { control: 'inline-radio', options: ['center', 'right'] } },
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

export const OnBackgrounds: Story = {
  name: 'On backgrounds',
  render: () => (
    <Backgrounds>
      <Price price="600$" secondaryPrice="26800 UAH" />
    </Backgrounds>
  ),
}
