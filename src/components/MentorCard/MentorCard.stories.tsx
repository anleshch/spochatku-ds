import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Photo } from '../Photo/Photo'
import placeholder from '../../storybook/placeholder-photo.svg'
import { MentorCard } from './MentorCard'

const meta = {
  title: 'Organisms/MentorCard',
  component: MentorCard,
  args: {
    name: 'Anna Lishchynska',
    role: 'Design and UX Lead @ Uklon, ex-LOKO, ex-lalafo',
    tag: 'Авторка',
    photo: <Photo src={placeholder} alt="" shape="circle" />,
    action: (
      <Button appearance="inverse" href="https://annalishchynska.com/" target="_blank">
        Більше про Анну
      </Button>
    ),
  },
  argTypes: { photo: { control: false }, action: { control: false } },
  decorators: [(Story) => <div style={{ width: '100%', maxWidth: 880 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=158-612' },
  },
} satisfies Meta<typeof MentorCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutTag: Story = { name: 'Without tag', args: { tag: undefined } }

export const Mobile: Story = { globals: { viewport: { value: 'mobile2' } } }

/* Як на сторінці курсу: дві картки в ряд, висота вирівнюється. */
export const Row: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 10 }}>
      <MentorCard {...args} />
      <MentorCard
        {...args}
        tag={undefined}
        name="Arina Serhieieva"
        role="Senior Product Designer @ Mindly, ex-LOKO"
        action={<Button appearance="inverse" href="https://www.linkedin.com/in/arina-serhieieva/" target="_blank">Більше про Аріну</Button>}
      />
    </div>
  ),
  decorators: [],
  parameters: { layout: 'padded' },
}

export const LongText: Story = {
  name: 'Long name and role (wraps)',
  args: {
    name: 'Олександра-Вікторія Костянтинопольська-Шевченко',
    role: 'Principal Product Designer & Design Systems Lead @ Very Long Company Name, ex-Another Company, ex-One More Company',
  },
}
