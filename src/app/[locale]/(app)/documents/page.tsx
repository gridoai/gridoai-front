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
import { FileUploader } from "../../../../components/fileUploader";
import { Pagination } from "../../../../components/pagination";
import { Button } from "../../../../components/ui/button";
import { useToast } from "../../../../components/use-toast";
import { useOrgChanges } from "../../../../hooks/useOrgChanges";
import { Document, DocumentSrc } from "../../../../types/Document";
import {
  decrementUploadCount,
  setDocumentCount,
} from "../../../../services/rateLimit";
import { usePlanUsage } from "../../../../hooks/usePlanUsage";
import { useI18n } from "../../../../locales/client";

const renderDocumentSrc = (src: DocumentSrc) =>
  match(src)
    .with({ Upload: P._ }, () => `upload` as const)
    .with({ CreateButton: P._ }, () => `manualCreation` as const)
    .with({ GDrive: P._ }, () => `googleDrive` as const)
    .exhaustive();

const RenderActions = (props: CellContext<Document, unknown>) => {
  const { toast } = useToast();
  const t = useI18n();
  return (
    <div className="flex justify-end">
      <DeleteButton
        hideText
        onError={() => {
          toast({ title: t(`documents.errorDeleting`) });
        }}
        onSuccess={decrementUploadCount}
        recordItemId={props.row.original.uid}
      />
    </div>
  );
};

const DocumentsList: React.FC = () => {
  const t = useI18n();
  const columns = React.useMemo<ColumnDef<Document>[]>(
    () => [
      {
        id: `name`,
        header: t(`name`),
        accessorKey: `name`,
      },
      {
        id: `source`,
        header: t(`source`),
        accessorKey: `source`,
        cell: function render({ getValue }) {
          return (
            <pre className="whitespace-nowrap text-ellipsis">
              {t(`documents.${renderDocumentSrc(getValue() as DocumentSrc)}`)}
            </pre>
          );
        },
      },
      {
        id: `content`,
        header: t(`content`),
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
        header: () => (
          <div className="flex justify-end">{t(`documents.actions`)}</div>
        ),
        cell: RenderActions,
      },
    ],
    [t]
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
        title: t(`documents.errorFetching`),
        description: error.message,
      });
    }
  }, [error, t, toast]);

  useOrgChanges(() => refetch());
  return (
    <div className={`flex flex-col bg-card p-2 gap-4 md:p-4 rounded-xl`}>
      <div className="p-2 m-1 flex-col gap-4 flex">
        <div className="text-3xl flex items-end gap-2 font-bold">
          Upload{` `}
          <div className="text-sm font-medium">
            (
            {t(`upload.sizeLimit`, {
              maxSize: 30,
            })}
            )
          </div>
          {` `}
        </div>
        <FileUploader onSuccess={() => refetch()} />
      </div>
      <List
        title={
          <>
            <div className="font-bold items-center text-3xl flex gap-2">
              {t(`documents.title`)}
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
              {t(`documents.refresh`)}
              <ArrowClockwise className={`ml-2 `} />
            </Button>
            <CreateButton>{t(`documents.create`)}</CreateButton>
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