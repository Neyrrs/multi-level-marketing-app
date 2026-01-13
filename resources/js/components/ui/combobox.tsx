import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useMemo } from 'react';

interface ComboBoxProps<T> {
    options: T[];
    value: string | number | null;
    onChange: (value: string | number) => void;
    getLabel: (item: T) => string;
    getValue: (item: T) => string | number;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    dataType: string;
}

export function DynamicCombobox<T>({
    options,
    value,
    onChange,
    getLabel,
    getValue,
    placeholder = 'Pilih data...',
    dataType = 'data',
    error,
}: ComboBoxProps<T>) {
    const selected = useMemo(
        () => options.find((item) => getValue(item) === value),
        [options, value, getValue],
    );

    return (
        <div className="space-y-1">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between border-primary border-3"
                    >
                        {selected ? getLabel(selected) : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput placeholder={`Cari ${dataType}...`} />
                        <CommandEmpty>{dataType} tidak ditemukan</CommandEmpty>
                        <CommandGroup>
                            {options.map((item) => {
                                const itemValue = getValue(item);
                                return (
                                    <CommandItem
                                        key={itemValue}
                                        onSelect={() => onChange(itemValue)}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                itemValue === value
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {getLabel(item)}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
