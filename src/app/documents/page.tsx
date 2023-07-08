"use client";
import { List, CreateButton, DeleteButton } from "@refinedev/chakra-ui";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

const DocumentsList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<Document>[]>(
    () => [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
      },

      {
        id: "content",
        header: "Content",
        accessorKey: "content",
        cell: function render({ getValue }) {
          return (
            <pre className="whitespace-nowrap text-ellipsis">
              {getValue().toString().slice(0, 20)}...
            </pre>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "name",
        cell: function render({ getValue }) {
          return <DeleteButton recordItemId={getValue() as number} />;
        },
      },
    ],
    []
  );

  const { getHeaderGroups, getRowModel } = useTable({
    columns,
  });

  return (
    <List headerButtons={<CreateButton />}>
      <TableContainer>
        <Table variant="simple" whiteSpace="pre-line">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id}>
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </List>
  );
};

interface Document {
  name: number;
  title: string;
  content: string;
}

export default DocumentsList;
