const Table = ({columns=[], rows=[]}) => {
    return (
    <table>
        <thead>
            <tr>
                {
                    columns.map(column => (
                        <th key={column}>{column}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
        {
            rows.map(row => (
                <tr key={row.id}>
                    {
                        columns.map(column => {
                            const cellValue = row[column];
                            if(typeof cellValue === 'function') {
                                return <td key={`row-${row.id}-${column}`}>{cellValue()}</td>;
                            }
                            return <td key={`row-${row.id}-${column}`}>{cellValue}</td>;
                        })
                    }
                </tr>
            ))
        }
        </tbody>
    </table>
    )
}

Table.displayName = 'Table';

export default Table;