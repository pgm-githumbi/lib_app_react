import { flexRender } from "@tanstack/react-table";
const Thead = ({ table }) => {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} scope="col">
              <div
                className="text-display-4"
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {{
                  asc: <span className="pl-2">↑</span>,
                  desc: <span className="pl-2">↓</span>,
                }[header.column.getIsSorted()] ?? null}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default Thead;
