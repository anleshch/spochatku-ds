import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight } from 'lucide-react'
import { Button } from '../Button/Button'
import { Price } from '../Price/Price'
import { CourseHero } from './CourseHero'

const meta = {
  title: 'Organisms/CourseHero',
  component: CourseHero,
  args: {
    title: 'Design for monetization',
    description:
      'Майстерклас про те, як бізнес заробляє гроші і як зробити дизайн, що цьому допомагає. Тут — про юніт-економіку та типи монетизації, поведінкову економіку, нейробіологію та сегменти.',
    tags: ['27.10.26', '1 місяць', 'Online'],
    sticker: 'тільки 7 місць',
    price: <Price align="responsive" price="600€" secondaryPrice="26800 UAH" />,
    action: (
      <Button appearance="inverse" href="#register">
        Зареєструватись
      </Button>
    ),
    iconAction: <Button appearance="outlined" icon={<ArrowRight />} aria-label="До реєстрації" href="#register" />,
  },
  argTypes: { price: { control: false }, action: { control: false }, iconAction: { control: false } },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=159-651' },
  },
} satisfies Meta<typeof CourseHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EarlyBird: Story = {
  name: 'Early bird price',
  args: {
    price: (
      <Price
        align="responsive"
        state="early-bird"
        price="600€"
        discountedPrice="510€"
        secondaryPrice="21700 UAH"
        note="−15% для Early bird – до 01.09 включно"
      />
    ),
  },
}

/** Figma State=Waitlist: набір закрито — без тегу з датою, з тегом когорти. */
export const Waitlist: Story = {
  args: {
    tags: ['1 місяць', 'Online', 'Когорта 03'],
    price: <Price align="responsive" price="500€" secondaryPrice="25400 UAH" />,
    action: (
      <Button appearance="inverse" href="#register">
        Запис у Waitlist
      </Button>
    ),
  },
}

export const Minimal: Story = {
  name: 'Without sticker and icon action',
  args: { sticker: undefined, iconAction: undefined },
}

export const LongTitle: Story = {
  name: 'Long title (wraps)',
  args: { title: 'Design for monetization and strategic product thinking' },
}

export const Mobile: Story = { globals: { viewport: { value: 'mobile2' } } }
