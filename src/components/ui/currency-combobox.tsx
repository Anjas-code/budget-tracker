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
import { useMutation, useQuery } from "@tanstack/react-query";
import { SkeletonWrapper } from "./skeleton-wrapper";
import { UserSettings } from "@prisma/client";
import { UpdateUserCurrency } from "@/_actions/userSettings";
import { toast } from "sonner";

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

    const mutation = useMutation({
        mutationFn: UpdateUserCurrency,
        onSuccess: (data: UserSettings) => {
            toast.success("Currency updated successfully  🎉", {
                id: "update-currency",
            });

            setSelectedOption(
                CURRENCIES.find(
                    (currency) => currency.value === data.currency
                ) || null
            );
        },
        onError: (e) => {
            console.log(e);
            toast.error("Something went wrong ⛔️", {
                id: "update-currency",
            });
        },
    });

    const handleSelectOption = React.useCallback(
        (currency: CURRENCY | null) => {
            if (!currency) {
                toast.error("please select a currency");
                return;
            }

            toast.loading("Updating currency...", {
                id: "update-currency",
            });

            mutation.mutate(currency.value);
        },
        [mutation]
    );

    React.useEffect(() => {
        if (!userSettings.data) return;

        const userCurrency = CURRENCIES.find(
            (currency) => currency.value === userSettings.data.currency
        );

        if (userCurrency) {
            setSelectedOption(userCurrency);
        }
    }, [userSettings.data]);

    if (isDesktop) {
        return (
            <SkeletonWrapper isLoading={userSettings.isFetching}>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            disabled={mutation.isPending}
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
                            setSelectedOption={handleSelectOption}
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
                    <Button
                        variant="outline"
                        className="w-full justify-start disabled={mutation.isPending}"
                    >
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
                            setSelectedOption={handleSelectOption}
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
