import React, { useState, useEffect } from 'react';
import {
	useTable,
	useRowSelect,
	usePagination,
	useGlobalFilter,
} from 'react-table';
import { client } from '../utils/api-client';
import { GlobalFilter } from './GlobalFilter';
import { IndeterminateCheckbox } from './IndeterminateCheckbox';
import { Pagination } from './Pagination';
import { Spinner } from './Spinner';

export const Table = ({ columns, path }) => {
	const [controlledPageCount, setControlledPageCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		selectedFlatRows,
		preGlobalFilteredRows,
		setGlobalFilter,
		state: { pageIndex, pageSize, globalFilter },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
			manualPagination: true,
			pageCount: controlledPageCount,
			autoResetPage: false,
			autoResetFilters: false,
		},
		useGlobalFilter,
		usePagination,
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				{
					id: 'selection',
					Header: ({ getToggleAllPageRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
						</div>
					),
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
			]);
		}
	);

	useEffect(() => {
		client(`${path}?page=${pageIndex + 1}&records=${pageSize}`).then(
			(response) => {
				setData(response.results);
				setControlledPageCount(response.totalPages);
				setLoading(false);
			}
		);
		setLoading(true);
	}, [path, pageIndex, pageSize]);

	return (
		<>
			<div className="flex flex-col">
				<div>
					<GlobalFilter
						preGlobalFilteredRows={preGlobalFilteredRows}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
				</div>
				<div>
					<Pagination
						firstPage={() => gotoPage(0)}
						previousPage={() => previousPage()}
						canPreviousPage={!canPreviousPage}
						nextPage={() => nextPage()}
						canNextPage={!canNextPage}
						pageIndex={pageIndex + 1}
						pageSize={pageSize}
						setPageSize={(e) => {
							setPageSize(Number(e.target.value));
						}}
						totalPages={pageOptions.length}
						lastPage={() => gotoPage(pageCount - 1)}
					/>
				</div>
				<div>{loading && <Spinner />}</div>
				<div className="overflow-x-auto">
					<div className="align-middle inline-block min-w-full">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table
								className="min-w-full divide-y divide-gray-200"
								{...getTableProps}
							>
								<thead>
									{headerGroups.map((headerGroup) => (
										<tr {...headerGroup.getHeaderGroupProps()}>
											{headerGroup.headers.map((column) => (
												<th
													className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 text-gray-500 font-semibold uppercase tracking-wider"
													{...column.getHeaderProps()}
												>
													{column.render('Header')}
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody
									className="bg-white divide-y divide-gray-200"
									{...getTableBodyProps}
								>
									{page.map((row, i) => {
										prepareRow(row);
										return (
											<tr
												{...row.getRowProps()}
												className="hover:bg-gray-100 hover:bg-opacity-50 cursor-pointer"
											>
												{row.cells.map((cell) => {
													return (
														<td
															className="px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-700"
															{...cell.getCellProps()}
														>
															{cell.render('Cell')}
														</td>
													);
												})}
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<pre className="py-3">
				<code>
					{JSON.stringify(
						{
							ids: selectedFlatRows.map((d) => d.original.id),
						},
						null,
						2
					)}
				</code>
				<code>
					{JSON.stringify(
						{
							objects: selectedFlatRows.map((d) => d.original),
						},
						null,
						2
					)}
				</code>
			</pre>
		</>
	);
};
