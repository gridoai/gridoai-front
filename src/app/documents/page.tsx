"use client";
import {
  List,
  CreateButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/chakra-ui";
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
import { CellContext, ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";
import { useToast } from "../../components/use-toast";
import { FileUploader } from "../../components/fileUploader";
import { useList } from "@refinedev/core";
import { Spinner } from "@phosphor-icons/react";
const RenderActions = (props: CellContext<Document, unknown>) => {
  const { toast } = useToast();
  console.log(props.row.original.uid);
  return (
    <div className="flex justify-end">
      <DeleteButton
        hideText
        onError={() => {
          toast({ title: "There was an error deleting the document" });
        }}
        recordItemId={props.row.original.uid}
      />
    </div>
  );
};

const DocumentsList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<Document>[]>(
    () => [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
      },
      {
        id: "source",
        header: "Source",
        accessorKey: "source",
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
        accessorKey: "name",
        header: () => <div className="flex justify-end">Actions</div>,
        cell: RenderActions,
      },
    ],
    []
  );

  const { getHeaderGroups, getRowModel, getState, refineCore } = useTable({
    columns,
    refineCoreProps: {
      syncWithLocation: true,
      queryOptions: {
        retry: 3,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        cacheTime: 3600,
        staleTime: 3600,
      },
    },
  });
  const { isLoading, fetchStatus } = refineCore.tableQueryResult;
  const loading = isLoading || fetchStatus === "fetching";

  return (
    <div className={` flex flex-col bg-neutral-1 p-4 rounded-xl`}>
      <List
        title={
          <>
            <div className="font-bold items-center text-3xl flex gap-2">
              Documents
              <Spinner
                className={loading ? "inline-block animate-spin" : "hidden"}
              />{" "}
            </div>
          </>
        }
        headerButtons={
          <>
            <RefreshButton className="mr-2" />
            <CreateButton />
          </>
        }
      >
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
      <div className="p-2 flex-col gap-4 mt-4 flex">
        <div className="text-3xl font-bold">Upload</div>
        <FileUploader />
      </div>
    </div>
  );
};

interface Document {
  uid: string;
  name: number;
  title: string;
  content: string;
  source: string;
}

export default DocumentsList;
