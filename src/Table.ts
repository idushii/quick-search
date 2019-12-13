

class Table {
    _rows: string[][] = []
    _columns: string[] = []

    constructor(rows?: string[][]) {
        if (rows) this._rows = rows;
    }

    get rows() {
        return this._rows
    }

    set rows(rows) {
        this._rows = rows
    }
}

export { Table }