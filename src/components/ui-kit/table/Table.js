import styles from "./Table.module.css";

const Table = ({columns=[], rows=[]}) => {
    return (
    <table className={styles.table}>
        <thead>
            <tr className={styles.tr}>
                {
                    columns.map(column => (
                        <th key={column} className={styles.th}>{column}</th>
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
                            const cellValue = row[column];
                            if(typeof cellValue === 'function') {
                                return <td key={`row-${row.id}-${column}`}>{cellValue(row.id)}</td>;
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