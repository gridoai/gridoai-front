"use client";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ArrowClockwise, Spinner } from "@phosphor-icons/react";
import {
  CreateButton,
  DeleteButton,
  List,
  RefreshButton,
} from "@refinedev/chakra-ui";
import { useTable } from "@refinedev/react-table";
import { CellContext, ColumnDef, flexRender } from "@tanstack/react-table";
import React, { useEffect } from "react";
import { P, match } from "ts-pattern";
import { FileUploader } from "../../../components/fileUploader";
import { Pagination } from "../../../components/pagination";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/use-toast";
import { useOrgChanges } from "../../../hooks/useOrgChanges";
import { Document, DocumentSrc } from "../../../types/Document";
import {
  decrementUploadCount,
  setDocumentCount,
} from "../../../services/rateLimit";
import { usePlanUsage } from "../../../hooks/usePlanUsage";

const renderDocumentSrc = (src: DocumentSrc) =>
  match(src)
    .with({ Upload: P._ }, () => `Upload`)
    .with({ CreateButton: P._ }, () => `Manual creation`)
    .with({ GDrive: P._ }, () => `Google Drive`)
    .exhaustive();

const RenderActions = (props: CellContext<Document, unknown>) => {
  const { toast } = useToast();
  return (
    <div className="flex justify-end">
      <DeleteButton
        hideText
        onError={() => {
          toast({ title: `There was an error deleting the document` });
        }}
        onSuccess={decrementUploadCount}
        recordItemId={props.row.original.uid}
      />
    </div>
  );
};

const DocumentsList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<Document>[]>(
    () => [
      {
        id: `name`,
        header: `Name`,
        accessorKey: `name`,
      },
      {
        id: `source`,
        header: `Source`,
        accessorKey: `source`,
        cell: function render({ getValue }) {
          return (
            <pre className="whitespace-nowrap text-ellipsis">
              {renderDocumentSrc(getValue() as DocumentSrc)}
            </pre>
          );
        },
      },
      {
        id: `content`,
        header: `Content`,
        accessorKey: `content`,
        cell: function render({ getValue }) {
          return (
            <pre className="whitespace-nowrap text-ellipsis">
              {(getValue() as string).toString().slice(0, 20)}...
            </pre>
          );
        },
      },
      {
        id: `actions`,
        accessorKey: `name`,
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
        staleTime: Infinity,
        onSuccess: (data) => setDocumentCount(data.total),
      },
      pagination: { mode: `server` },
    },
  });

  const { current, setCurrent, pageSize, setPageSize, pageCount } = refineCore;

  const { isLoading, fetchStatus, refetch, error, data } =
    refineCore.tableQueryResult;
  const loading = isLoading || fetchStatus === `fetching`;

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: `There was an error fetching the documents`,
        description: error.message,
      });
    }
  }, [error, toast]);

  useOrgChanges(() => refetch());
  return (
    <div className={`flex flex-col bg-card p-2 gap-4 md:p-4 rounded-xl`}>
      <div className="p-2 m-1 flex-col gap-4 flex">
        <div className="text-3xl flex items-end gap-2 font-bold">
          Upload <div className="text-sm font-medium">(30MB Max)</div>
          {` `}
        </div>
        <FileUploader onSuccess={() => refetch()} />
      </div>
      <List
        title={
          <>
            <div className="font-bold items-center text-3xl flex gap-2">
              Documents
              <Spinner
                className={loading ? `inline-block animate-spin` : `hidden`}
              />
              {` `}
            </div>
          </>
        }
        headerButtons={
          <>
            <Button
              className={loading ? `opacity-50` : ``}
              onClick={() => refetch()}
              variant={`outline`}
              size={`lg`}
            >
              Refresh
              <ArrowClockwise className={`ml-2 `} />
            </Button>
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
      <div className="flex self-end p-2 md:p-4 w-full">
        <Pagination
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          onPageChange={setCurrent}
          current={current}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default DocumentsList;