/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils'
import { Input } from '../input'
import { Label } from '../label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select'
import { Textarea } from '../textarea'
import { MultiSelect } from '../multi-select'
import { MultiSelectProps } from '../multi-select/multi-select'
import { ReactNode } from 'react'

type FormFieldType =
  | 'input'
  | 'select'
  | 'textarea'
  | 'file'
  | 'multi-select'
  | 'custom'

type Option = {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

type FormFieldProps = {
  type: FormFieldType
  label?: string
  name: string
  placeholder?: string
  value: any
  onChange: (value: any) => void
  className?: string
  options?: Option[]
  error?: string | string[] | undefined
  withErrorSpace?: boolean
  disabled?: boolean
  multiSelectProps?: Omit<
    MultiSelectProps,
    'options' | 'onValueChange' | 'defaultValue' | 'placeholder'
  >
  children?: ReactNode
}

export const FormField = (props: FormFieldProps) => {
  const showErrorSpace = props.withErrorSpace !== false
  const hasError = !!props.error
  const disabledClass = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

  const renderField = () => {
    if (props.children) {
      return (
        <div
          className={cn(
            'w-full, h-full rounded-[20px]',
            disabledClass,
            hasError && 'border border-red-500',
          )}
        >
          {props.children}
        </div>
      )
    }

    switch (props.type) {
      case 'select':
        return (
          <Select
            value={props.value}
            onValueChange={props.onChange}
            disabled={props.disabled}
          >
            <SelectTrigger
              className={cn(
                'h-[60px] w-full rounded-full border-0 bg-tetriary text-sm md:text-base',
                hasError && 'border border-red-500',
                disabledClass,
                props.className,
              )}
            >
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className="flex flex-col gap-10 text-white-secondary border-0">
              {props.options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={props.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'textarea':
        return (
          <Textarea
            name={props.name}
            className={cn(
              'w-full rounded-[16px] border-0 bg-tetriary text-sm md:text-base h-[172px]',
              hasError && 'border border-red-500',
              disabledClass,
              props.className,
            )}
            value={props.value}
            onChange={(e) => !props.disabled && props.onChange(e.target.value)}
            placeholder={props.placeholder}
            disabled={props.disabled}
          />
        )

      case 'file':
        return (
          <Input
            type="file"
            className={cn(
              'h-[60px] w-full rounded-full border-0 bg-tetriary text-sm md:text-base',
              hasError && 'border border-red-500',
              disabledClass,
              props.className,
            )}
            onChange={(e) =>
              !props.disabled && props.onChange(e.target.files?.[0])
            }
            disabled={props.disabled}
          />
        )

      case 'multi-select':
        return (
          <MultiSelect
            options={props.options || []}
            onValueChange={props.onChange}
            defaultValue={props.value || []}
            placeholder={props.placeholder || 'Select options'}
            className={cn(
              'h-[60px] w-full rounded-full border-0 bg-tetriary text-sm md:text-base',
              hasError && 'border border-red-500',
              disabledClass,
              props.className,
            )}
            disabled={props.disabled}
            {...props.multiSelectProps}
          />
        )

      case 'input':
      default:
        return (
          <Input
            type="text"
            name={props.name}
            className={cn(
              'h-[60px] w-full rounded-full border-0 bg-tetriary text-sm md:text-base',
              hasError && 'border border-red-500',
              disabledClass,
              props.className,
            )}
            value={props.value}
            onChange={(e) => !props.disabled && props.onChange(e.target.value)}
            placeholder={props.placeholder}
            disabled={props.disabled}
          />
        )
    }
  }

  return (
    <div className="flex flex-col gap-1 w-full col-span-2">
      {props.label && (
        <Label
          className={cn(
            'text-white text-base leading-5 mb-1',
            props.disabled && 'opacity-50',
          )}
        >
          {props.label}
        </Label>
      )}

      {renderField()}

      {showErrorSpace && (
        <div className="min-h-[20px]">
          {hasError && (
            <div className="text-red-500 text-sm">
              {Array.isArray(props.error)
                ? props.error.join(', ')
                : props.error}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
