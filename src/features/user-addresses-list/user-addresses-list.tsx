'use client';

import { Button } from '@/shared/components/ui/button';
import { AddressList } from '@/entities/address';
import { Address } from '@/entities/address';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { EditUserAddressDialog } from './edit-user-address-dialog';
import { User } from '@/entities/user';
import { UserAddressesProvider, useUserAddressesStore } from './user-addresses-store';
import { FunctionComponent } from 'react';
import { AddUserAddressDialog } from './add-user-address-dialog';
import { useListPagination } from '@/shared/components/list-pagination';
import { DeleteUserAddressButton } from './delete-user-address-button';

interface UserAddressListProps {
    user: User;
    addresses?: Address[];
}

export const List = () => {
    const { user, addresses, isAddressesLoading } = useUserAddressesStore();
    const { paginatedItems, ListPagination } = useListPagination({ listItems: addresses, itemsPerPage: 10 });
    return (
        <div className="flex flex-col gap-4 w-full overflow-x-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold">{user.fullName} addresses</h1>
                <AddUserAddressDialog />
            </div>
            <AddressList
                addresses={paginatedItems}
                isLoading={isAddressesLoading}
                RowAction={({ address }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                                asChild>
                                <EditUserAddressDialog address={address} userName={user.fullName} />
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <DeleteUserAddressButton address={address} />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            />
            <ListPagination />
        </div>
    );
};

export const UserAddressList: FunctionComponent<UserAddressListProps> = ({ addresses, user }) => {
    return (
        <UserAddressesProvider initialAddresses={addresses ?? []} user={user}>
            <List />
        </UserAddressesProvider>
    );
};
