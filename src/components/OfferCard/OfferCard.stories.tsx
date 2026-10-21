import type { Meta, StoryObj } from '@storybook/react-vite'
import { Price } from '../Price/Price'
import { OfferCard } from './OfferCard'

const meta = {
  title: 'Organisms/OfferCard',
  component: OfferCard,
  args: {
    href: '#',
    tags: ['27.10.26', 'Online'],
    title: 'Design for Monetization',
    description: 'Майстерклас про те, як бізнес заробляє гроші і як зробити дизайн, що цьому допомагає.',
    price: <Price align="right" price="600$" secondaryPrice="26800 UAH" />,
    actionLabel: 'Детальніше',
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['available', 'unavailable'] },
    size: { control: 'inline-radio', options: ['default', 'compact'] },
    actionAppearance: { control: 'inline-radio', options: ['inverse', 'outlined'] },
    price: { control: false },
  },
  decorators: [
    (Story, { parameters }) => (
      <div style={{ width: '100%', maxWidth: parameters.maxWidth ?? 880 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=102-950' },
  },
} satisfies Meta<typeof OfferCard>

export default meta
type Story = StoryObj<typeof meta>

export const Available: Story = {}

export const WithSticker: Story = { name: 'With sticker', args: { sticker: 'когорта — тільки 7 місць' } }

export const Unavailable: Story = {
  args: {
    status: 'unavailable',
    description: undefined,
    note: 'Ще не запустили, але скоріше за все буде у 2026',
  },
}

export const UnavailableWithSticker: Story = {
  name: 'Unavailable with sticker',
  args: { ...Unavailable.args, sticker: 'старт навесні' },
}

export const LongText: Story = {
  name: 'Long text (wraps)',
  args: {
    sticker: 'когорта — тільки 7 місць',
    title: 'Design Leadership for Future Leaders: стратегія, команда, процеси і впровадження змін',
    description:
      'Дуже довгий опис майстеркласу, який переноситься на кілька рядків і показує, як картка поводиться з великим обсягом тексту без обрізання.',
  },
}

const states = [
  { name: 'Default', id: undefined },
  { name: 'Hover', id: 'offer-hover' },
  { name: 'Pressed', id: 'offer-active' },
  { name: 'Focus', id: 'offer-focus' },
] as const

export const AllStates: Story = {
  name: 'All states',
  render: (args) => (
    <div style={{ display: 'grid', gap: 40 }}>
      {states.map((s) => (
        <div key={s.name} style={{ display: 'grid', gap: 8 }}>
          <span className="text-body-s-medium">{s.name}</span>
          <OfferCard {...args} id={s.id} sticker="когорта — тільки 7 місць" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    pseudo: { hover: ['#offer-hover'], active: ['#offer-active'], focusVisible: ['#offer-focus'] },
  },
}

export const Mobile: Story = {
  name: 'Mobile (< 1024 px)',
  args: { sticker: 'когорта — тільки 7 місць' },
  globals: { viewport: { value: 'mobile2' } },
}

export const OutlinedAction: Story = {
  name: 'Outlined action (not clickable)',
  args: { href: undefined, actionAppearance: 'outlined', actionLabel: 'Запис після знайомства' },
}

/** Size=Compact: 3 колонки на desktop, картки однієї висоти, ціна й кнопка на одному рівні. */
export const Compact: Story = {
  name: 'Compact (3 columns)',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
      <OfferCard
        size="compact"
        href="#"
        tags={['15-30хв']}
        title="Знайомство"
        description="На цій зустрічі ми розбираємо ваш запит, я даю перший напрямок думок і визначаємо чи зможу я бути для вас корисною."
        price={<Price align="right" price="Free" />}
        actionLabel="Записатись"
      />
      <OfferCard
        size="compact"
        tags={['80хв', 'Дизайнеру']}
        title="Сесія для дизайнера"
        description="Консультація або менторство з фокусом на запит."
        price={<Price align="right" price="80€" />}
        actionLabel="Запис після знайомства"
        actionAppearance="outlined"
      />
      <OfferCard
        size="compact"
        tags={['5 по 80хв', 'Бізнесу']}
        title="Місяць консультацій для бізнеса"
        description="Заходжу у команду як Advisor та працюємо фокусно над вашим запитом."
        price={<Price align="right" price="1000€" />}
        actionLabel="Запис після знайомства"
        actionAppearance="outlined"
      />
    </div>
  ),
  parameters: {
    maxWidth: 1280,
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=229-2815' },
  },
}
