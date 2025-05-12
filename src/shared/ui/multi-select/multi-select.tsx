import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { WandSparkles } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import ChevronDownIcon from '@/shared/assets/icons/chevron-down-icon'
import { CrossIcon } from '@/shared/assets/icons'

const multiSelectVariants = cva('m-0', {
  variants: {
    variant: {
      default: 'border-foreground/10 text-foreground',
      secondary:
        'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      inverted: 'inverted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
    image?: string
  }[]
  onValueChange: (value: string[]) => void
  defaultValue?: string[]
  placeholder?: string
  animation?: number
  maxCount?: number
  modalPopover?: boolean
  asChild?: boolean
  className?: string
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  ({
    options,
    onValueChange,
    variant,
    defaultValue = [],
    placeholder = 'Select options',
    animation = 0,
    modalPopover = false,
    className,
    ...props
  }) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue)
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
    const [isAnimating, setIsAnimating] = React.useState(false)
    const [triggerWidth, setTriggerWidth] = React.useState('auto')
    const triggerRef = React.useRef<HTMLButtonElement>(null)

    React.useEffect(() => {
      if (triggerRef.current && isPopoverOpen) {
        setTriggerWidth(`${triggerRef.current.offsetWidth}px`)
      }
    }, [isPopoverOpen])

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option]
      setSelectedValues(newSelectedValues)
      onValueChange(newSelectedValues)
    }

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev)
    }

    return (
      <div className="relative">
        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          modal={modalPopover}
        >
          <PopoverTrigger asChild>
            <Button
              ref={triggerRef}
              {...props}
              variant="multipleSelect"
              size="multipleSelectTrigger"
              onClick={handleTogglePopover}
              className={cn(
                'flex w-full rounded-md border min-h-10 h-auto items-center justify-between bg-inherit [&_svg]:pointer-events-auto relative',
                className,
              )}
            >
              {selectedValues.length > 0 ? (
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1 w-full justify-between">
                    <div className="flex items-center gap-1 w-full overflow-x-auto no-scrollbar max-w-[410px]">
                      {selectedValues.map((value) => {
                        const option = options.find((o) => o.value === value)
                        const IconComponent = option?.icon
                        return (
                          <Badge
                            key={value}
                            variant="secondary"
                            className={cn(
                              multiSelectVariants({ variant }),
                              'rounded-full text-white flex-shrink-0',
                            )}
                          >
                            {IconComponent && (
                              <IconComponent className="h-4 w-4 mr-2" />
                            )}
                            {option?.label}
                            <CrossIcon
                              className="h-4 w-4 cursor-pointer"
                              onClick={(event) => {
                                event.stopPropagation()
                                toggleOption(value)
                              }}
                            />
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <ChevronDownIcon
                      className={cn(
                        'w-7 h-7 text-white',
                        isPopoverOpen ? 'rotate-180' : '',
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full h-full">
                  <span className="text-white-tertiary text-sm md:text-base ">
                    {placeholder}
                  </span>
                  <ChevronDownIcon
                    className={cn(
                      'w-7 h-7 text-white',
                      isPopoverOpen ? 'rotate-180' : '',
                    )}
                  />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            style={{ width: triggerWidth }}
            className="w-full p-4 pt-[38px]"
            align="start"
            onEscapeKeyDown={() => setIsPopoverOpen(false)}
          >
            <div className="grid grid-cols-4 gap-x-6 gap-y-5">
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <div
                    key={option.value}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => toggleOption(option.value)}
                  >
                    <div
                      className={cn(
                        'relative w-[85px] h-[85px] rounded-full overflow-hidden border-2',
                        isSelected
                          ? 'border-stroke-accent'
                          : 'border-transparent',
                      )}
                    >
                      {option.image ? (
                        <img
                          src={option.image}
                          alt={option.label}
                          className="w-full h-full object-cover"
                        />
                      ) : option.icon ? (
                        <option.icon className="w-full h-full p-4" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          {option.label.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="text-white text-[12px] font-bold text-center">
                      {option.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              'absolute right-0 top-full mt-1 cursor-pointer text-foreground bg-background w-3 h-3',
              isAnimating ? '' : 'text-muted-foreground',
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </div>
    )
  },
)

MultiSelect.displayName = 'MultiSelect'
