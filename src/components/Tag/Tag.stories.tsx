import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag, type TagAppearance, type TagSize } from './Tag'

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: '12 тижнів', appearance: 'default', size: 'm' },
  argTypes: {
    appearance: { control: 'inline-radio', options: ['default', 'inverse', 'outlined'] },
    size: { control: 'inline-radio', options: ['m', 's'] },
  },
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=62-22' },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Inverse: Story = { args: { appearance: 'inverse' } }

export const Outlined: Story = { args: { appearance: 'outlined' } }

export const Small: Story = { args: { size: 's' } }

const appearances: TagAppearance[] = ['default', 'inverse', 'outlined']
const sizes: TagSize[] = ['m', 's']

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(3, auto)', gap: 24, alignItems: 'center', justifyItems: 'start' }}>
      <span />
      {appearances.map((a) => (
        <span key={a} className="text-body-s-medium">{a}</span>
      ))}
      {sizes.map((size) => (
        <div key={size} style={{ display: 'contents' }}>
          <span className="text-body-s-medium">{size.toUpperCase()}</span>
          {appearances.map((appearance) => (
            <Tag key={appearance} appearance={appearance} size={size}>tag</Tag>
          ))}
        </div>
      ))}
    </div>
  ),
}
