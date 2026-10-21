import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mail, Search } from 'lucide-react'
import { Input } from './Input'
import { InputField } from './InputField'
import { PhoneInput } from './PhoneInput'
import { Select } from './Select'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { placeholder: 'Ваше ім’я' },
  argTypes: { invalid: { control: 'boolean' }, disabled: { control: 'boolean' } },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=242-78' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Filled: Story = { args: { defaultValue: 'Анна Ліщинська' } }

export const Invalid: Story = { name: 'Error', args: { defaultValue: 'anna@mail', invalid: true } }

export const Disabled: Story = { args: { disabled: true } }

export const WithIcons: Story = {
  name: 'With icons',
  args: { iconLeft: <Search />, placeholder: 'Пошук' },
}

export const LongText: Story = {
  name: 'Long text (truncates)',
  args: { iconLeft: <Mail />, defaultValue: 'Дуже довге значення поля, яке не вміщується в ширину і обрізається' },
}

const states = [
  { name: 'Default', id: undefined },
  { name: 'Hover', id: 'input-hover' },
  { name: 'Focus', id: 'input-focus' },
] as const

export const AllStates: Story = {
  name: 'All states',
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 760 }}>
      {states.flatMap((s) => [
        <Input key={s.name} {...args} id={s.id} placeholder={s.name} />,
        <Input key={`${s.name}-e`} {...args} id={s.id && `${s.id}-e`} placeholder={`${s.name} · Error`} invalid />,
      ])}
      <Input {...args} defaultValue="Filled" />
      <Input {...args} defaultValue="Filled · Error" invalid />
      <Input {...args} placeholder="Disabled" disabled />
    </div>
  ),
  decorators: [(Story) => <Story />],
  parameters: {
    pseudo: {
      hover: ['div:has(> #input-hover)', 'div:has(> #input-hover-e)'],
      focus: ['#input-focus', '#input-focus-e'],
      focusVisible: ['#input-focus', '#input-focus-e'],
    },
  },
}

/** InputField 242:2777: лейбл + поле + підказка; error замінює підказку і фарбує рамку. */
export const Field: Story = {
  name: 'InputField',
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <InputField label="Ім’я" hint="Як до вас звертатись">
        <Input placeholder="Ваше ім’я" />
      </InputField>
      <InputField label="Email" error="Вкажіть коректний email">
        <Input type="email" defaultValue="anna@mail" iconLeft={<Mail />} />
      </InputField>
    </div>
  ),
}

/** Select 244:2958: нативний список у вигляді Input. */
export const SelectStory: Story = {
  name: 'Select',
  render: () => (
    <InputField label="Роль або посада">
      <Select
        placeholder="Обери варіант"
        options={[
          { value: 'junior', label: 'Junior Product Designer' },
          { value: 'middle', label: 'Middle Product Designer' },
          { value: 'senior', label: 'Senior Product Designer' },
        ]}
      />
    </InputField>
  ),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=244-2958' } },
}

/** PhoneInput 244:2868: префікс країни + формат під час введення (libphonenumber-js). */
export const Phone: Story = {
  name: 'PhoneInput',
  render: () => (
    <InputField label="Номер телефону">
      <PhoneInput placeholder="50 123 4567" />
    </InputField>
  ),
  parameters: { design: { type: 'figma', url: 'https://www.figma.com/design/Svu5osTmwoz7tbm0Jw0q1u/?node-id=244-2868' } },
}
