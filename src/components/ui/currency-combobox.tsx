"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CURRENCY } from "@/definitions";
import { CURRENCIES } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { SkeletonWrapper } from "./skeleton-wrapper";
import { UserSettings } from "@prisma/client";

export function CurrencyCombobox() {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [selectedOption, setSelectedOption] = React.useState<CURRENCY | null>(
        null
    );

    const userSettings = useQuery<UserSettings>({
        queryKey: ["user-setting"],
        queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
    });

    React.useEffect(() => {
        if (!userSettings.data) return;

        const userCurrency = CURRENCIES.find((currency) => currency.value === userSettings.data.currency)

        if (userCurrency) {
            setSelectedOption(userCurrency)
        }
    }, [userSettings.data])

    if (isDesktop) {
        return (
            <SkeletonWrapper isLoading={userSettings.isFetching}>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                        >
                            {selectedOption ? (
                                <>{selectedOption.label}</>
                            ) : (
                                <>+ Set Currency</>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                        <OptionsList
                            setOpen={setOpen}
                            setSelectedOption={setSelectedOption}
                        />
                    </PopoverContent>
                </Popover>
            </SkeletonWrapper>
        );
    }

    return (
        <SkeletonWrapper isLoading={userSettings.isFetching}>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        {selectedOption ? (
                            <>{selectedOption.label}</>
                        ) : (
                            <>+ Set Currency</>
                        )}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <OptionsList
                            setOpen={setOpen}
                            setSelectedOption={setSelectedOption}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </SkeletonWrapper>
    );
}

function OptionsList({
    setOpen,
    setSelectedOption,
}: {
    setOpen: (open: boolean) => void;
    setSelectedOption: (status: CURRENCY | null) => void;
}) {
    return (
        <Command>
            <CommandInput placeholder="Filter status..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {CURRENCIES.map((currency: CURRENCY) => (
                        <CommandItem
                            key={currency.value}
                            value={currency.value}
                            onSelect={(value) => {
                                setSelectedOption(
                                    CURRENCIES.find(
                                        (currency) => currency.value === value
                                    ) || null
                                );
                                setOpen(false);
                            }}
                        >
                            {currency.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
