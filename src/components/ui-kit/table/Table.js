import styles from "./Table.module.css";

const Table = ({columns=[], rows=[]}) => {
    return (
    <table className={styles.table}>
        <thead>
            <tr className={styles.tr}>
                {
                    columns.map(column => (
                        <th key={column.id} className={styles.th}>
                            {
                                typeof column.renderer  === 'function' ? 
                                column.renderer() : column.id
                            }
                        </th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
        {
            rows.map(row => (
                <tr key={row.id} className={styles.tr}>
                    {
                        columns.map(column => {
                            const cellValue = row[column.id];
                            if(typeof cellValue === 'function') {
                                return <td key={`row-${row.id}-${column.id}`} className={styles.td}>{cellValue(row.id)}</td>;
                            }
                            return <td key={`row-${row.id}-${column.id}`} className={styles.td}>{cellValue}</td>;
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