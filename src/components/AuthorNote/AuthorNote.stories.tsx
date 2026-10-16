import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button'
import { Photo } from '../Photo/Photo'
import placeholder from '../../storybook/placeholder-photo.svg'
import { AuthorNote } from './AuthorNote'

const meta = {
  title: 'Organisms/AuthorNote',
  component: AuthorNote,
  args: {
    name: 'Анна Ліщинська',
    role: 'Design and UX Lead @ Uklon, ex-LOKO, ex-lalafo.',
    children:
      'Є тема, якої мені бракує в українському product design просторі.\nЯк дизайнеру напряму впливати на продукт та decision making.\n\nТож я запустила майстеркласи для продакт-дизайнерів.\nYou are invited.',
    photo: <Photo src={placeholder} alt="" shape="circle" />,
    action: <Button href="https://annalishchynska.com/" target="_blank">Більше про Анну</Button>,
  },
  argTypes: { photo: { control: false }, action: { control: false } },
  parameters: {
    layout: 'padded',
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=173-904' },
  },
} satisfies Meta<typeof AuthorNote>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutAction: Story = { name: 'Without action', args: { action: undefined } }

export const Mobile: Story = { globals: { viewport: { value: 'mobile2' } } }

export const LongText: Story = {
  name: 'Long text (wraps)',
  args: { role: 'Дуже довга посада, що переноситься на кілька рядків @ Company', children: 'Довгий текст листа. '.repeat(40) },
}
