enum Delimiter {
    space = ' ',
    tck = ';',
    zpt = ',',
}

class Table {
    _rows: string[][] = []
    _columns: string[] = []

    constructor(columns: string[], rows?: string[][]) {
        if (rows) this._rows = rows;
        this.columns = columns;
    }

    get rows() {
        return this._rows;
    }

    set rows(rows) {
        this._rows = rows;
    }

    get columns() {
        return this._columns;
    }

    set columns(columns: string[]) {
        this._columns = columns;
    }

    newLine(line: string[] = []) {
        this._rows.push(line);
    }

    fromCSV(str: string, delimiter: Delimiter = Delimiter.space) {
        if (!str) return;
        let lines = str.split('\r\n');
        for (let line of lines) {
            this.newLine(line.split(delimiter));
        }
    }
}

export { Table }